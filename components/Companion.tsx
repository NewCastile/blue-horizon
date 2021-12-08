/** @format */
import React from "react"
import { useIsFetching } from "react-query"
import styles from "./Companion.module.css"
import VercelSVG from "./VercelSVG"
import DotLoader from "./DotLoader"

const Companion = () => {
	const isFetching = useIsFetching()
	return (
		<div className={styles.wrapper}>
			<a
				className={styles.link}
				href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
				target='_blank'
				rel='noopener noreferrer'>
				Powered by <VercelSVG />
			</a>
			<p className={styles.link}>
				and <a href='https://newsapi.org/'>NewsAPI</a>
			</p>
			{isFetching ? <DotLoader /> : null}
		</div>
	)
}

export default Companion
