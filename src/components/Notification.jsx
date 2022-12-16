import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

/**
 * Renders a notification
 */
const Notification = () => {
	const notification = useSelector(state => state.notification)

	return (
		<>
			{notification.spinner &&
				<Spinner animation='border' />
			} <div>{notification.message}</div>
		</>

	)
}

export default Notification