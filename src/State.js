import React from 'react';


import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import Nav from 'react-bootstrap/Nav';
import AppNavbar from './Components/AppNavbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
class State extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          timeSeries: "a"
        };
    }

    componentDidMount() {
        //this.setState( {timeSeries: "data"});
        alert(this.state.timeSeries);
        fetch('https://3no0uoyhyh.execute-api.us-east-1.amazonaws.com/PROD/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState( {timeSeries: "data"});
          //alert(this.state.timeSeries);
        });
    }

    render() {  
         
    return (<Container className="p-3">
    
        <AppNavbar/><br/><h1 className="header">{this.props.region}</h1>
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
            <Nav.Link href="/state/Florida">Florida</Nav.Link>
            <Nav.Link href="/state/Georgia">Georgia</Nav.Link>
            <Nav.Link href="/state/North-Carolina">North Carolina</Nav.Link>
            <Nav.Link href="/state/South-Carolina">South Carolina</Nav.Link>
            </Nav>
        </Col>
        <Col xs={10}>  
        <br/>
        <TimeSeriesChart region={this.props.region} timeSeries={this.state.timeSeries}/>
        </Col>
        </Row>
    </Container>
     );
    }
}

export default State;
