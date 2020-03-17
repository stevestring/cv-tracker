

import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


class AppNavbar extends React.Component {

    render() {  
    
        return (

        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">US Coronavirus Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/State/Maryland">Maryland</NavDropdown.Item>
                <NavDropdown.Item href="/State/Virginia">Virginia</NavDropdown.Item>
                <NavDropdown.Item href="/State/Pennsylvania">Pennsylvania</NavDropdown.Item>
                <NavDropdown.Item href="/State/California">California</NavDropdown.Item>
                <NavDropdown.Item href="/State/New-York">New York</NavDropdown.Item>
                <NavDropdown.Item href="/State/Washington">Washington</NavDropdown.Item>
                <NavDropdown.Item href="/State/Colorado">Colorado</NavDropdown.Item>
                <NavDropdown.Item href="/State/Oregon">Oregon</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
    }
}
export default AppNavbar;