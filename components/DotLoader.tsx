/** @format */

import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"

const DotLoader = () => {
	return <Dot />
}

const move = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
      transform: translateX(20px)
    }
	50% {
      transform: translateX(0px)
    }
	75% {
      transform: translateX(-20px)
    }
    100% {
        transform: translateX(0);
    }
`

const Dot = styled.div`
	height: 0.5em;
	width: 0.5em;
	background-color: white;
	border-radius: 50%;
	animation: ${move} 1s linear infinite;
`

export default DotLoader
