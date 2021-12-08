/** @format */

import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { GetNewsResult } from "types"

const API_KEY = process.env.API_KEY1

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { page, country } = req.query

	try {
		const pageParam = parseInt(page as string)
		const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&page=${page}&pageSize=6&apiKey=${API_KEY}`
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
