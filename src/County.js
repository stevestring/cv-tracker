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

class County extends React.Component {
  
    render() {  
    
    return (<Container className="p-3">
        <AppNavbar/>
        <Jumbotron>
        <h1 className="header">United States Coronavirus Tracker</h1>     
        </Jumbotron>
        <TimeSeriesChart region={this.props.region}/>
    </Container>
     );
    }
}

export default County;
