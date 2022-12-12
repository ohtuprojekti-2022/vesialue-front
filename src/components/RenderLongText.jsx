import { React, useState } from 'react'
import { Nav } from 'react-bootstrap'

export const renderWithLineBreaks = (textContent) => {
	return textContent.split('\n').map((content, index) => {
		return (
			<p key={index} style={{ display: 'inline' }}>
				{content}
				<br />
			</p>
		)
	})
}

const RenderLongText = ({ text, maxLength = 300 }) => {
	const [showMoreText, setShowMoreText] = useState(false)

	return (
		<div data-testid='long-textcontent'>
			{showMoreText
				? renderWithLineBreaks(text)
				: renderWithLineBreaks(text.substring(0, maxLength))
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
