import { React, useState } from 'react'
import { Nav } from 'react-bootstrap'

export const textToParagraphs = (textContent) => {
	return textContent.split('\n').map((content, index) => {
		if (content) {
			return (
				<p key={index}>
					{content}
				</p>
			)
		}
	})
}

const RenderLongText = ({ text, maxLength = 300 }) => {
	const [showMoreText, setShowMoreText] = useState(false)

	return (
		<div data-testid='long-textcontent'>
			{showMoreText
				? textToParagraphs(text)
				: textToParagraphs(text.substring(0, maxLength))
			}
			{text.length > maxLength && (
				<Nav.Link
					style={{ color: 'blue' }}
					onClick={() => setShowMoreText(!showMoreText)}
				>
					{showMoreText ? 'Näytä vähemmän ⯅' : 'Näytä enemmän ⯆'}
				</Nav.Link>
			)}
		</div>
	)
}

export default RenderLongText
