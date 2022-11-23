import React from 'react'
import { Navbar as BNavbar, Nav, NavDropdown, NavLink } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})

	return (
		<BNavbar
			collapseOnSelect
			expand="md"
			className="py-3 px-2"
			style={{ zIndex: 2000 }}
		>
			<BNavbar.Brand href="/">
				<img
					src="/logo192.png"
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt="MAS logo"
				/>{' '}
				Vesialueen inventointi-ilmoitus
			</BNavbar.Brand>
			<BNavbar.Toggle aria-controls="basic-navbar-nav" />
			<BNavbar.Collapse id="responsive-navbar-nav">
				<Nav>
					<NavLink eventKey="1" as={Link} to="/" data-testid="front-page">
						Etusivu
					</NavLink>
					<NavLink
						eventKey="2"
						as={Link}
						to="/inventointi-ilmoitus"
						data-testid="new-inventory"
					>
						Uusi ilmoitus
					</NavLink>
					{userDetails && (
						<NavDropdown
							title={userDetails.user.username}
							id="navbarScrollingDropdown"
							data-testid="logged-in-user-dropdown"
						>
							<NavDropdown.Item
								eventKey="3"
								as={Link}
								to="/omasivu#tiedot"
								style={{ paddingLeft: '1rem' }}
								data-testid="user-page"
							>
								Oma sivu
							</NavDropdown.Item>
							{userDetails.user.admin > 0 && (
								<NavDropdown.Item
									eventKey="6"
									as={Link}
									to="/muokatut"
									style={{ paddingLeft: '1rem' }}
									data-testid="edit-requests"
								>
									Muokkauspyynnöt
								</NavDropdown.Item>
							)}
							<NavDropdown.Divider />
							<NavDropdown.Item>
								<LogoutButton />
							</NavDropdown.Item>
						</NavDropdown>
					)}
					{!userDetails && (
						<NavDropdown
							title="Käyttäjä"
							id="navbarScrollingDropdown"
							data-testid="user-dropdown"
						>
							<NavLink
								eventKey="4"
								as={Link}
								to="/kirjaudu"
								style={{ paddingLeft: '1rem' }}
								data-testid="login"
							>
								Kirjaudu
							</NavLink>
							<NavLink
								eventKey="5"
								as={Link}
								to="/rekisteroidy"
								style={{ paddingLeft: '1rem' }}
								data-testid="register"
							>
								Rekisteröidy
							</NavLink>
						</NavDropdown>
					)}
				</Nav>
			</BNavbar.Collapse>
		</BNavbar>
	)
}

export default Navbar
