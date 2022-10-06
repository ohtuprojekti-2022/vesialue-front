import React from 'react'
import { Navbar as BNavbar, Nav, NavDropdown, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = ({ userDetails, setUserDetails }) => {
	return (
		<BNavbar collapseOnSelect expand="md" className="py-3 px-2">
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
					<NavLink eventKey="1" as={Link} to="/" >Etusivu</NavLink>
					<NavLink eventKey="2" as={Link} to="/inventointi-ilmoitus" >Uusi ilmoitus</NavLink>
					<NavLink eventKey="3" as={Link} to="/kartta-demo" >Kartta demo</NavLink>
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
							<NavLink eventKey="4" as={Link} to="/kirjaudu">Kirjaudu</NavLink>
							<NavLink eventKey="5" as={Link} to="/rekisteroidy">Rekisteröidy</NavLink>
						</NavDropdown>
					)}
					
				</Nav>
			</BNavbar.Collapse>
		</BNavbar>
	)
}

export default Navbar
