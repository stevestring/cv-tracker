import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import AppNavbar from './Components/AppNavbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
class State extends React.Component {
  
    render() {  
    
    return (<Container className="p-3">
    
        <AppNavbar/><br/><h1 className="header">{this.props.region} coronavirus cases</h1>
        <br/>
        <Row>
        <Col xs={2}><Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/state/Maryland">Maryland</Nav.Link>
            <Nav.Link href="/state/Pennsylvania">Pennsylvania</Nav.Link>
            <Nav.Link href="/state/Virginia">Virginia</Nav.Link>
            <Nav.Link href="/state/New-York">New York</Nav.Link>
            <Nav.Link href="/state/California">California</Nav.Link>
            <Nav.Link href="/state/New-Jersey">New Jersey</Nav.Link>
            <Nav.Link href="/state/Colorado">Colorado</Nav.Link>
            <Nav.Link href="/state/Washington">Washington</Nav.Link>
            <Nav.Link href="/state/Oregon">Oregon</Nav.Link>

            </Nav>
        </Col>
        <Col xs={10}>  
        <TimeSeriesChart region={this.props.region}/>
        </Col>
        </Row>
    </Container>
     );
    }
}

export default State;
