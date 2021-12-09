/** @format */

import { INewsResult, IQueryState, SortOption } from "../../types/index"
import axios from "axios"
import Article from "components/Article"
import { useRouter } from "next/dist/client/router"
import React, { useRef } from "react"
import { useInfiniteQuery } from "react-query"
import { articleDescriptionLength } from ".."
import { DateTime } from "luxon"
import { primaryColor, dangerColor } from "components/styled/index"
import {
	Container,
	Select,
	Button,
	Text,
	InputGroup,
	Input,
} from "components/styled/index"

const getNews = async (
	pageParam: number,
	params: IQueryState
): Promise<INewsResult> => {
	const url = `/api/news/q/${params.topic as string}?page=${pageParam}&from=${
		params.from
	}&to=${params.to}&lang=${params.lang}&sort=${params.sort}`
	const data = await axios.get(url).then((res) => res.data)
	return {
		...data,
		hasMore: pageParam * 12 >= data.totalResults ? false : true,
	}
}

const Scroll = () => {
	const router = useRouter()
	const { locale, locales } = router
	let { topic, from, to, sort } = router.query
	const langRef = useRef<HTMLSelectElement>(null)
	const sortRef = useRef<HTMLSelectElement>(null)
	const maxDateRef = useRef<HTMLInputElement>(null)
	const minDateRef = useRef<HTMLInputElement>(null)

	from = (from as string) ?? "2021-11-13"
	to = (to as string) ?? "2021-12-21"
	sort = (sort as string) ?? "publishedAt"
	const sortOnChangeHandler = () => {
		const url = `/q/${topic as string}?from=${from}&to=${to}&sort=${
			sortRef.current?.value
		}`
		router.push(url, undefined, {
			shallow: true,
			locale: locale,
		})
	}
	const langOnChangeHandler = () => {
		const loc = langRef.current?.value as string
		let t: string
		if ((topic as string) === "nfl" && loc !== "en") {
			t = "football"
		} else if ((topic as string) === "football" && loc === "en") {
			t = "nfl"
		} else {
			t = topic as string
		}
		router.push(`/q/${t}?from=${from}&to=${to}&sort=${sort}`, undefined, {
			shallow: true,
			locale: loc,
		})
	}
	const dateOnChangeHandler = () => {
		let max: number = dateToMillis(maxDateRef.current?.value as string)
		let min: number = dateToMillis(minDateRef.current?.value as string)
		let med: number
		if (min > max) {
			med = max
			max = min
			min = med
		}
		const url = `/q/${topic as string}?from=${millisToISODate(
			min
		)}&to=${millisToISODate(max)}&lang=${locale}&sort=${sort}`
		router.push(url, undefined, {
			shallow: true,
		})
	}
	const {
		data,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		status,
		refetch,
	} = useInfiniteQuery(
		[
			"infinite-news",
			topic,
			from as string,
			to as string,
			sort as string,
			locale as string,
		],
		({ pageParam = 1 }) => {
			return getNews(pageParam, {
				topic: topic as string,
				from: from as string,
				to: to as string,
				sort: sort as string,
				lang: locale as string,
			})
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			enabled: !!topic,
			refetchOnWindowFocus: false,
		}
	)
	return (
		<Container>
			<InputGroup>
				<Select
					value={(locales as string[]).filter((loc) => loc === locale)[0]}
					ref={langRef}
					name='language'
					id='language'
					onChange={langOnChangeHandler}>
					{locales?.map((loc, i) => {
						return (
							<option key={i} value={loc} selected>
								{loc}
							</option>
						)
					})}
				</Select>
				<Select
					value={
						sortOptions.map((opt) => opt.value).filter((opt) => opt === sort)[0]
					}
					ref={sortRef}
					name='language'
					id='language'
					onChange={sortOnChangeHandler}>
					{sortOptions.map((sort, i) => {
						return (
							<option key={i} value={sort.value} selected>
								{sort.key}
							</option>
						)
					})}
				</Select>
				<Input
					type='date'
					ref={minDateRef}
					defaultValue={DateTime.now().minus({ days: 3 }).toISODate()}
					max={DateTime.now().toISODate()}
					onChange={dateOnChangeHandler}
				/>
				<Input
					type='date'
					ref={maxDateRef}
					defaultValue={DateTime.now().toISODate()}
					max={DateTime.now().toISODate()}
					onChange={dateOnChangeHandler}
				/>
			</InputGroup>
			{data ? (
				<>
					{data?.pages.map((page) => {
						return page.articles.map((article, i) => {
							const descriptionLength = articleDescriptionLength(
								article.description
							)

							return (
								<Article
									key={i}
									info={article}
									descriptionLength={descriptionLength}
								/>
							)
						})
					})}
					<div style={{ margin: "5px" }}>
						<Button
							style={{ backgroundColor: primaryColor }}
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
								? "Load More"
								: "Nothing to load"}
						</Button>
					</div>
				</>
			) : null}
			{status === "loading" && <Text color={primaryColor}>Is Loading...</Text>}
			{status === "error" && (
				<div>
					<Text color={dangerColor}>
						Error!{" "}
						<Button
							style={{ backgroundColor: dangerColor }}
							onClick={() => refetch()}>
							Try again
						</Button>
					</Text>
				</div>
			)}
		</Container>
	)
}

const dateToMillis = (date: string): number => {
	return DateTime.fromISO(date).toMillis()
}

const millisToISODate = (date: number): string => {
	return DateTime.fromMillis(date).toISODate()
}

const sortOptions: SortOption[] = [
	{ key: "Popular", value: "popularity" },
	{ key: "Newest", value: "publishedAt" },
	{ key: "Most Relevant", value: "relevancy" },
]

export default Scroll
