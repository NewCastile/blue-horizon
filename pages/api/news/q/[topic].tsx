/** @format */

import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { GetNewsResult } from "types"

const API_KEY = process.env.API_KEY1

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { topic, page, from, to, lang, sort } = req.query
	const pageParam = parseInt(page as string)
	const url = `https://newsapi.org/v2/everything?q=${topic as string}&from=${
		from as string
	}&to=${to as string}&sortBy=${sort as string}&language=${
		lang as string
	}&page=${page as string}&pageSize=12&apiKey=${API_KEY}`

	try {
		const data: GetNewsResult = await axios.get(url).then((res) => res.data)
		const val = pageParam * 12 >= data.totalResults ? false : pageParam + 1
		res.status(200).json({ articles: data.articles, nextCursor: val })
	} catch (error) {
		if ((req.statusCode as number) === 429) {
			res.status(429).json({
				message: "Requests limit has been reached, please change api key",
			})
		}
		res.status(400).json({
			message: `An error has ocurred: ${error}`,
		})
	}
}
