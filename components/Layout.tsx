/** @format */

import Navbar from "./Navbar"
import Companion from "./Companion"
import { ReactChild } from "react"

export default function Layout({ children }: { children: ReactChild }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Companion />
		</>
	)
}
