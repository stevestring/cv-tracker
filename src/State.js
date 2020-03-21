import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import TimeSeriesTable from './Components/TimeSeriesTable';

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
        fetch('https://3no0uoyhyh.execute-api.us-east-1.amazonaws.com/PROD/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var filtered = data.filter(a=>a["Country/Region"] === "US"
            && a["Province/State"].search(",") === -1 );
          
          this.setState( {timeSeries: filtered});
          this.setState( {loaded: true});
          //alert(this.state.timeSeries);
        });
    }

    handleSelect = (evtKey, evt) => {
        // Get the selectedIndex in the evtKey variable
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
            if (Date.parse(key)>Date.parse('3/08/2020'))
            {
                ar.push([key,jsonTs[key]]);  
            }    
        }
        //alert(JSON.stringify(ar));
        console.log (ar);
        return ar 
    };  
    //TODO: Deal with this in Data service
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

    render() {  
        if(!this.state.loaded)
        {
            return null;
        }
        else
        {
            var statesArray = this.getStates();
            let statesDropDownItems = statesArray.map((item) =>
                <Dropdown.Item eventKey={item[0]}>{item[1]}</Dropdown.Item>
                );
            return (
                <Container className="p-3">    
                <AppNavbar/>                
                <br/>
                
                    {/* <h1 className="header">{this.props.region}</h1> */}
                        <DropdownButton className="pull-right" id="dropdown-basic-button" 
                            title={this.state.region} onSelect={this.handleSelect}>
                            {statesDropDownItems}
                        </DropdownButton>
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
