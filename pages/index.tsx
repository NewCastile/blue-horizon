/** @format */

import axios from "axios"
import Article from "components/Article"
import { useRouter } from "next/dist/client/router"
import React, { useRef } from "react"
import { useInfiniteQuery } from "react-query"
import { INewsResult } from "types"
import { primaryColor, dangerColor } from "components/styled/index"
import { Container, Select, Button, Text } from "components/styled/index"

const Home = () => {
	const router = useRouter()
	const { locale, locales } = router
	const langRef = useRef<HTMLSelectElement>(null)
	const langOnChangeHandler = () => {
		router.push("/", undefined, {
			shallow: true,
			locale: langRef.current?.value,
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
		["infinite-news", locale as string],
		({ pageParam = 1 }) => getNews(pageParam, locale as string),
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			refetchOnWindowFocus: false,
		}
	)
	return (
		<Container>
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
			{data ? (
				<>
					{data?.pages.map((page) => {
						return page.articles.map((article, i) => {
							const descriptionLength = articleDescriptionLength(
								article.description
							)
							if (descriptionLength === "long") {
								return (
									<Article key={i} info={article} descriptionLength='long' />
								)
							} else if (descriptionLength === "normal") {
								return (
									<Article key={i} info={article} descriptionLength='normal' />
								)
							}
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
					Error!{" "}
					<Button
						style={{ backgroundColor: dangerColor }}
						onClick={() => refetch()}>
						Try again
					</Button>
				</div>
			)}
		</Container>
	)
}

export function articleDescriptionLength(description: string) {
	if (!description) {
		return undefined
	}

	const descriptionLength: number = description.split(" ").length

	if (descriptionLength >= 25) {
		return "long"
	}
	if (descriptionLength <= 25) {
		return "normal"
	}
}

const getNews = async (
	pageParam: number,
	country: string
): Promise<INewsResult> => {
	const url = `/api/news/${pageParam}?country=${country}`
	const data = await axios.get(url).then((res) => res.data)
	return data
}

export default Home
