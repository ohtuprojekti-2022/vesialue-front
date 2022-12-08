import { React, useState } from 'react'
import { Nav } from 'react-bootstrap'

export const RenderLongText = ({ text, maxLength = 300 }) => {
	const [showMoreText, setShowMoreText] = useState(false)
	return (
		<div data-testid='long-textcontent' style={{ whitespace: 'pre-line', display: 'inline' }}>
			{showMoreText
				? text
				: text.substring(0, maxLength)}
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