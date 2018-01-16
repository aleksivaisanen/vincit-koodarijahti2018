import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Header extends Component{
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Vincit ankkajahti</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1}>Home
                    </NavItem>
                    <NavItem eventKey={2}>Add a sighting
                    </NavItem>
                    <NavItem eventKey={3}>Browse sightings
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;