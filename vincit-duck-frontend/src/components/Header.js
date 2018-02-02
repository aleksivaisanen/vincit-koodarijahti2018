import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Header extends Component{
   
    changePage = (page) =>{
        this.props.changePage(page);
    }
    render(){
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Vincit Duck Hunt 2018
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} className = {this.props.currentPage === 'home' ? 'active' : ''} onClick={this.changePage.bind(this, 'home')}>Home
                        </NavItem>
                        <NavItem eventKey={2} className = {this.props.currentPage === 'add sighting' ? 'active' : ''} onClick={this.changePage.bind(this, 'add sighting')}>Add a sighting
                        </NavItem>
                        <NavItem eventKey={3} className = {this.props.currentPage === 'browse sightings' ? 'active' : ''} onClick={this.changePage.bind(this, 'browse sightings')}>Browse sightings
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;