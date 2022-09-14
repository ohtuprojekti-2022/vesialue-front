import React from 'react'
import { Navbar as BNavbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navbar = () => {
	
	return (
		<BNavbar bg="dark" variant="dark" fixed="top" className="py-3" collapseOnSelect>
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
			<BNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				<Nav>
					<LinkContainer to="/">
						<Nav.Link>Etusivu</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/kirjaudu">
						<Nav.Link>Kirjaudu</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/rekisteröidy">
						<Nav.Link>Rekisteröidy</Nav.Link>
					</LinkContainer>
						
				</Nav>
			</BNavbar.Collapse>
		</BNavbar>
	)
  
}

export default Navbar