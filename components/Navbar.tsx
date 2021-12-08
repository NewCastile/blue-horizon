/** @format */
import styles from "./Navbar.module.css"
import Link from "next/link"
import { TopicLink } from "types"
import { useRouter } from "next/dist/client/router"

const Navbar = () => {
	const router = useRouter()
	const { locale } = router

	return (
		<div className={styles.wrapper}>
			<div className={styles.navbar}>
				{links.map((link, index) => {
					return (
						<div className={styles.nav_item} key={index}>
							{link.text === "Football" && locale === "en" ? (
								<Link href='/q/nfl'>
									<a>
										NFL <span>{String.fromCodePoint(0x1f3c8)}</span>
									</a>
								</Link>
							) : (
								<Link href={link.href}>
									<a>
										{link.text}{" "}
										<span>{String.fromCodePoint(link.emoji as number)}</span>
									</a>
								</Link>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

const links: TopicLink[] = [
	{ href: "/q/football", text: "Football", emoji: 0x26bd },
	{ href: "/q/tennis", text: "Tennis", emoji: 0x1f3be },
	{ href: "/q/nba", text: "NBA", emoji: 0x1f3c0 },
	{ href: "/q/mlb", text: "MLB", emoji: 0x26be },
	{ href: "/q/entertaiment", text: "Entertaiment", emoji: 0x1f386 },
	{ href: "/q/travels", text: "Travels", emoji: 0x1f30d },
	{ href: "/q/restaurants", text: "Restaurants", emoji: 0x1f374 },
	{ href: "/q/hotels", text: "Hotels", emoji: 0x1f3e8 },
	{ href: "/q/science", text: "Science", emoji: 0x1f9ea },
	{ href: "/q/technology", text: "Technology", emoji: 0x1f4bb },
	{ href: "/q/medicine", text: "Medicine", emoji: 0x1fa7a },
	{ href: "/q/cosmetics", text: "Cosmetics", emoji: 0x2728 },
]

export default Navbar
