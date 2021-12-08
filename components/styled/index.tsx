/** @format */

import { css } from "@emotion/react"
import styled from "@emotion/styled"

export const primaryColor = "rgb(36, 132, 221)"
export const dangerColor = "rgb(255, 51, 51)"

export const Container = styled.div`
	width: 50%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const InputGroup = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

export const InputStyles = css`
	border: 1px solid ${primaryColor};
	border-radius: 10px;
	padding: 5px 15px;
	font-weight: bold;
	color: ${primaryColor};
`

export const Input = styled.input`
	${InputStyles}
`

export const Select = styled.select`
	appearance: none;
	border: 1px solid ${primaryColor};
	border-radius: 10px;
	padding: 5px 15px;
	font-weight: bold;
	color: ${primaryColor};
`

export const Button = styled.button`
	font-weight: bold;
	color: white;
	padding: 10px;
	border: 0;
`

export const Text = styled.p`
	color: ${(props) => props.color};
	font-weight: bold;
`
