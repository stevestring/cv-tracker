import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import TimeSeriesTable from './Components/TimeSeriesTable';
import RegionHeader from './Components/RegionHeader';

import AppNavbar from './Components/AppNavbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/DropDown';
import Spinner from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import history from "./history";
import StateData from './StateData.json';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class State extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          region: "Maryland",
          current:0,
          pctPopulation:0,
          timeSeries: null
        };
    }

    componentDidMount() {
        this.setState( {region: this.props.region});
        fetch('https://3no0uoyhyh.execute-api.us-east-1.amazonaws.com/PROD/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        //   var filtered = data.filter(a=>a["Country/Region"] === "US"
        //     && a["Province/State"].search(",") === -1 );
          
          this.setState( {timeSeries: data});
          this.setState( {loaded: true});
          //alert(this.state.timeSeries);


        });
    }

    handleSelect = (evtKey, evt) => {
        // Get the selectedIndex in the evtKey variable
        history.push('/region/'+evtKey);//.toLowerCase());
        this.setState( {region: evtKey});
    }
    transFormJSON(region){      
        var ar = new Array();            
        region = region.replace(/-/g, " ");
        //region = region.replace(" MD",", MD");
        //alert(region);
        var jsonTs =  this.getTimeSeriesforState(region)
        for (var key in jsonTs) {               
                //console.log(key + " -> " + data1[0].TimeSeries[key]);
            if (Date.parse(key)>Date.parse('3/08/2020')
            && Date.parse(key)<Date.parse('3/23/2020'))
            {
                ar.push([key,jsonTs[key]]);  
            }    
        }
        //alert(JSON.stringify(ar));
        console.log (ar);
        return ar 
    };  

    getTimeSeriesforState(state){   
        //alert(this.state.timeSeries);
          state = state.replace(/-/g, " ");
          for (var obj in this.state.timeSeries) {                
                  //console.log(key + " -> " + data1[0].TimeSeries[key]);
                  //alert(JSON.stringify(this.state.timeSeries[obj]));
                  if (this.state.timeSeries[obj]["Province/State"].toLowerCase() === state.toLowerCase())
                  {
                      
                      return this.state.timeSeries[obj].TimeSeries;     
                  }
          }    
      };


    getStates(){   
        //alert(this.state.timeSeries);
        var ar = new Array(); 
        var region; 
        var regionKey;
          for (var key in this.state.timeSeries) {                
                  //console.log(key + " -> " + data1[0].TimeSeries[key]);
                //   if (
                //     this.state.timeSeries[key]["Country/Region"] === "US" 
                //     && this.state.timeSeries[key]["Province/State"].search(",") === -1
                //     )
                //   {
                    region = this.state.timeSeries[key]["Province/State"];
                    regionKey = region.replace(/-/g, " "); 
                    ar.push([regionKey,region]);                                       
                //  }
          }   
          //ar.push([regionKey,region]);  Add US Here
          return ar.sort();
    }; 

    getPopulationForState(state){   
        state = state.replace(/ /g, "-");
        for (var obj in StateData) {                
                  //console.log(key + " -> " + data1[0].TimeSeries[key]);
                  //alert(JSON.stringify(this.state.timeSeries[obj]));
                  if (StateData[obj]["State"].toLowerCase() === state.toLowerCase())
                  {                      
                      return StateData[obj].Population;     
                  }
        }   
        return 0; 
      }; 

    render() {  
        if(!this.state.loaded)
        {
            return (
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
            );
        }
        else
        {
            var statesArray = this.getStates();
            var population = this.getPopulationForState(this.state.region);
            var regionTimeSeries = this.getTimeSeriesforState(this.state.region);           
            var lastDate;
            var priorDate;
            for(var key in regionTimeSeries)
            {   
                if (Date.parse(key)<Date.parse('3/23/2020'))
                {
                priorDate = lastDate;
                lastDate = key;
                }
            }


            var currentCases = regionTimeSeries[lastDate]; 
            var priorCases = regionTimeSeries[priorDate];  


            let statesDropDownItems = statesArray.map((item) =>
                <Dropdown.Item eventKey={item[0]}>{item[1]}</Dropdown.Item>
                );
            return (
                <Container className="p-3">    
                {/* <AppNavbar/>    */}
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="./index.html">US Coronavirus Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="justify-content-end">
                        <Nav.Item>
                        <DropdownButton id="dropdown-basic-button" 
                                            title={this.state.region} onSelect={this.handleSelect}>
                                            <Dropdown.Item eventKey={'United States'}>United States</Dropdown.Item>
                                            <Dropdown.Divider />
                                            {statesDropDownItems}
                                    </DropdownButton>
                        </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    <RegionHeader currentCases = {currentCases} priorCases={priorCases} population = {population}/>
                    {/* <h1 className="header">{this.state.region}</h1>
                    <h6>{currentCasesString } total cases ({pctPopulation}% of population)</h6>                    
                    <h6>{newCasesString } new cases ({newCasesPercentIncrease}% increase)</h6> */}
                    
                    <br/>
                    <TimeSeriesChart region={this.state.region} 
                        timeSeries={this.state.timeSeries} />   
                    <TimeSeriesTable region={this.state.region} 
                        timeSeries={this.state.timeSeries} />              
                </Container>
            );

            }
    }    
}

export default State;
