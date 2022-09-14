import React from 'react'
import { Navbar as BNavbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navbar = () => {
	
	return (
		<BNavbar bg="#eeeeee" fixed="top" className="py-3" collapseOnSelect>
			<BNavbar.Brand href="/">Vesialueen inventointi-ilmoitus</BNavbar.Brand>
			<BNavbar.Toggle aria-controls="basic-navbar-nav" />
			<BNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				<Nav>
					<LinkContainer to="/home">
						<Nav.Link>Etusivu</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/login">
						<Nav.Link>Kirjaudu</Nav.Link>
					</LinkContainer>
				</Nav>
			</BNavbar.Collapse>
		</BNavbar>
	)
  
}

export default Navbar