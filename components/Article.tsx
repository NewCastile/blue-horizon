/** @format */

import styled from "@emotion/styled"
import { useRef, useState } from "react"
import { useIsFetching } from "react-query"
import { ArticleProps, DescriptionProps } from "types"
import Image from "next/image"
import sorry from "../assets/sorry.gif"

const Basic = ({ info, descriptionLength }: ArticleProps) => {
	const isFetching = useIsFetching()
	const imgRef = useRef<HTMLImageElement | null>(null)
	const [load, setLoad] = useState<Boolean>(false)

	return (
		<Wrapper>
			<ImageWrapper style={isFetching ? { filter: "blur(2px)" } : undefined}>
				{info.urlToImage ? (
					<>
						<Gradient style={!load ? { display: "none" } : undefined} />
						<MyImage
							ref={imgRef}
							style={!load ? { display: "none" } : undefined}
							onLoad={() => {
								setLoad(true)
							}}
							alt=''
							onError={() => {
								;(imgRef.current as HTMLImageElement).src =
									"../assets/sorry.gif"
							}}
							src={`${info.urlToImage.toString()}`}
						/>
						{descriptionLength ? (
							<>
								{descriptionLength === "long" && <Marker>Long Title</Marker>}
								<Description textLength='long'>{info.description}</Description>
							</>
						) : (
							<Description textLength='normal'>
								No description found
							</Description>
						)}
					</>
				) : (
					<>
						<Image alt='img-fallback' src={sorry} layout='fill' />
						{descriptionLength ? (
							<>
								{descriptionLength === "long" && <Marker>Long Title</Marker>}
								<Description textLength='long'>
									{info.description.slice(0, 120)}
								</Description>
							</>
						) : (
							<Description textLength='normal'>
								No description found
							</Description>
						)}
					</>
				)}
			</ImageWrapper>
			<ContentWrapper>
				<Content>{info.content}</Content>
				<Foot>
					<div>{info.author}</div>
					<div>{info.publishedAt}</div>
				</Foot>
			</ContentWrapper>
		</Wrapper>
	)
}

const Article = ({ info, descriptionLength }: ArticleProps) => {
	return <Basic info={info} descriptionLength={descriptionLength} />
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 400px;
`

const ContentWrapper = styled.div`
	color: rgb(29, 102, 170);
	font-weight: bold;
	height: max-height;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 250px;
`

const Gradient = styled.div`
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.5) 41%,
		rgba(255, 255, 255, 0) 100%
	);
	height: 100%;
	width: 100%;
	position: absolute;
`

const Marker = styled.span`
	background-color: rgb(75, 130, 5);
	color: white;
	padding: 2px 15px;
	position: absolute;
	font-weight: bold;
	top: 5px;
	right: 0;
`
const MyImage = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 5px;
`

const Description = styled.div<DescriptionProps>`
	position: absolute;
	top: ${(props) => (props.textLength === "long" ? "8%" : "0")};
	color: white;
	font-size: 18px;
	font-weight: bold;
	padding: 10px;
	height: 100%;
	overflow-y: hidden;
`

const Foot = styled.div`
	color: gray;
	font-size: 12px;
`

const Content = styled.div`
	font-weight: 12px;
`

export default Article
