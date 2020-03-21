import React from 'react';

import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import Nav from 'react-bootstrap/Nav';
import AppNavbar from './Components/AppNavbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/DropDown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class State extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          region: "Maryland",
          timeSeries: null
        };
    }

    componentDidMount() {
        this.setState( {region: this.props.region});
        //alert(this.state.timeSeries);
        // fetch('https://3no0uoyhyh.execute-api.us-east-1.amazonaws.com/PROD/')
        // .then((response) => {
        //   return response.json();
        // })
        // .then((data) => {
        //   this.setState( {timeSeries: data});
        //   //alert(this.state.timeSeries);
        // });
    }

    handleSelect = (evtKey, evt) => {
        // Get the selectedIndex in the evtKey variable
        this.setState( {region: evtKey});
    }


    render() {  
         
    return (
        <Container className="p-3">    
        <AppNavbar/>
        <br/>
        {/* <h1 className="header">{this.props.region}</h1> */}
            <DropdownButton className="pull-right" id="dropdown-basic-button" 
                title={this.state.region} onSelect={this.handleSelect}>
                <Dropdown.Item eventKey="Maryland">Maryland</Dropdown.Item>
                <Dropdown.Item eventKey="Pennsylvania">Pennsylvania</Dropdown.Item>
                <Dropdown.Item eventKey="Virginia">Virginia</Dropdown.Item>
                <Dropdown.Item eventKey="New-York">New-York</Dropdown.Item>
                <Dropdown.Item eventKey="California">California</Dropdown.Item>
                <Dropdown.Item eventKey="Florida">Florida</Dropdown.Item>
                <Dropdown.Item eventKey="Ohio">Ohio</Dropdown.Item>
                <Dropdown.Item eventKey="Washington">Washington</Dropdown.Item>
            </DropdownButton>
        <br/>
        <TimeSeriesChart region={this.state.region}/>
        </Container>
     );
    }
}

export default State;
