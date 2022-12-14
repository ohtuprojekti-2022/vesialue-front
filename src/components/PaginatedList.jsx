import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { filteredInventoriesAndAreas } from '../utils/tools'
import InventoryList from './inventory/InventoryList'
import Notification from './Notification'

/**
 * Functionality for splitting the list of inventories into pages
 */
const PaginatedList = ({ perPageNumber, columns }) => {
	let filterResults
	const [filteredInventories] = useSelector(({ inventories, filter }) => {
		const [filteredInventories] = filteredInventoriesAndAreas(inventories, [], filter)
		filterResults = !(filteredInventories.length === 0 && inventories.length > 0)
		return [filteredInventories]
	})

	const notification = useSelector(state => state.notification)

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(perPageNumber)

	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
	const currentRecords = filteredInventories.slice(indexOfFirstRecord, indexOfLastRecord)
	const nPages = Math.ceil(filteredInventories.length / recordsPerPage)


	useEffect(() => {
		setCurrentPage(1)
	}, [nPages])

	const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
		const visibleNumbers = nPages == 1
			? [1] : (nPages == 2
				? [1, 2] : (currentPage == 1
					? [currentPage, currentPage + 1, currentPage + 2] : (currentPage == nPages
						? [currentPage - 2, currentPage - 1, currentPage] : [currentPage - 1, currentPage, currentPage + 1])))
		const nextPage = () => {
			if (currentPage !== nPages) setCurrentPage(currentPage + 1)
		}
		const prevPage = () => {
			if (currentPage !== 1) setCurrentPage(currentPage - 1)
		}
		return (
			<nav>
				<ul className='pagination justify-content-center'>
					<li className="page-item"
						key={'previous'}>
						<a className="page-link"
							onClick={prevPage}
							style={{ cursor: 'pointer' }}>
							Edellinen
						</a>
					</li>
					{nPages > 3 && currentPage >= 3 &&
						<li className="page-item"
							key={'first'}>
							<a onClick={() => setCurrentPage(1)}
								className='page-link'
								style={{ cursor: 'pointer' }}>
								{1}
							</a>
						</li>
					}
					{nPages > 4 && currentPage >= 4 &&
						<li className="page-item"
							key={'dots1'}>
							<a className='page-link'>
								{'...'}
							</a>
						</li>
					}
					{visibleNumbers.map((pgNumber) => (
						<li key={pgNumber}
							className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
							<a onClick={() => setCurrentPage(pgNumber)}
								className='page-link'
								style={{ cursor: 'pointer' }}>
								{pgNumber}
							</a>
						</li>
					))}
					{nPages > 4 && currentPage <= nPages - 3 &&
						<li className="page-item"
							key={'dots2'}>
							<a className='page-link'>
								{'...'}
							</a>
						</li>
					}
					{nPages > 3 && currentPage <= nPages - 2 &&
						<li className="page-item"
							key={'last'}>
							<a onClick={() => setCurrentPage(nPages)}
								className='page-link'
								style={{ cursor: 'pointer' }}>
								{nPages}
							</a>
						</li>
					}
					<li className="page-item"
						key={'next'}>
						<a className="page-link"
							onClick={nextPage}
							style={{ cursor: 'pointer' }}>
							Seuraava
						</a>
					</li>
				</ul>
			</nav>
		)
	}

	return (
		<Container>
			{filteredInventories.length !== 0 && (
				<>
					<Pagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					<InventoryList
						data={currentRecords}
						columns={columns}
					/>
					<Pagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</>
			)
				|| window.location.pathname === '/omasivu' && <p>Et ole vielä tehnyt inventointeja</p>
				|| !filterResults && window.location.pathname === '/' && <p><b>Ei hakuehtoja vastaavia inventointeja</b></p>
				|| notification.message && window.location.pathname === '/' && <Notification />
				|| <p><b>Ei inventointeja</b></p>

			}
		</Container>
	)
}

export default PaginatedList
