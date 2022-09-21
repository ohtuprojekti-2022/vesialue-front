import React from 'react'
import { Navbar as BNavbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import LogoutButton from './LogoutButton'

const Navbar = ({ userDetails, setUserDetails }) => {
	return (
		<BNavbar className="py-3 px-2" collapseOnSelect>
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
			<BNavbar.Collapse id="basic-navbar-nav">
				<Nav>
					<LinkContainer to="/">
						<Nav.Link>Etusivu</Nav.Link>
					</LinkContainer>
					{userDetails && (
						<NavDropdown title="Käyttäjä" id="navbarScrollingDropdown">
							<NavDropdown.Item>
								<BNavbar.Text>
									Signed in as: {userDetails.user.username}
								</BNavbar.Text>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<LogoutButton setUserDetails={setUserDetails} />
							</NavDropdown.Item>
						</NavDropdown>
					)}
					{!userDetails && (
						<NavDropdown title="Käyttäjä" id="navbarScrollingDropdown">
							<NavDropdown.Item>
								<LinkContainer to="/kirjaudu">
									<Nav.Link>Kirjaudu</Nav.Link>
								</LinkContainer>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<LinkContainer to="/rekisteroidy">
									<Nav.Link>Rekisteröidy</Nav.Link>
								</LinkContainer>
							</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>
			</BNavbar.Collapse>
		</BNavbar>
	)
}

export default Navbar
