/** @format */

import "../styles/globals.css"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import React, { useState } from "react"
import { AppProps } from "next/app"
import Layout from "../components/Layout"

export default function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
		</QueryClientProvider>
	)
}
