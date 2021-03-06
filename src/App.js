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

import './App.css';


const App = () => (  
  <Container className="p-3">
  <AppNavbar/>
    <Jumbotron>
      <h1 className="header">United States Coronavirus Tracker</h1>     
    </Jumbotron>
    <TimeSeriesChart region = "Maryland"/>
  </Container>
);

export default App;
