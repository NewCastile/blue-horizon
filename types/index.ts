/** @format */

export interface ArticleProps {
	info: INew
	descriptionLength?: string
}

export interface DescriptionProps {
	textLength: string
}

export interface GetNewsResult {
	status: string
	totalResults: number
	articles: INew[]
}

export interface IQueryState {
	topic: string | string[]
	from: string
	to: string
	lang: string
	sort: string
}

export interface INew {
	source: { id: string; name: string }
	author: string
	title: string
	description: string
	url: string
	urlToImage: string
	publishedAt: string
	content: string
}

export interface INewsResult {
	articles: INew[]
	nextCursor: number
}

export type Language = {
	code: string
	language: string
}

export type TopicLink = {
	href: string
	text: string
	emoji?: number
}

export type SortOption = {
	key: string
	value: "publishedAt" | "popularity" | "relevancy"
}
