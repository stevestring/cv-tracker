import React from 'react';

import Container from 'react-bootstrap/Container';
import TimeSeriesChart from './Components/TimeSeriesChart';
import TimeSeriesTable from './Components/TimeSeriesTable';
import RegionHeader from './Components/RegionHeader';
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
          regionDisplay: "Maryland",
          current:0,
          pctPopulation:0,
          timeSeries: null,
          regionTimeSeries:[{"confirmed":0,"fatal":0,"recovered":0,"date":"2020-03-21"},{"confirmed":0,"fatal":0,"recovered":0,"date":"2020-03-25"}]
        };
    }

    componentDidMount() {
        this.setState( {region: this.props.region});
        this.setState ({regionDisplay:this.getDisplayNameForState(this.props.region)})
        fetch('https://4ogw2v7y15.execute-api.us-east-1.amazonaws.com/default/cv-data-lambda-nyt')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        //   var filtered = data.filter(a=>a["Country/Region"] === "US"
        //     && a["Province/State"].search(",") === -1 );
          //alert(JSON.stringify(data));
          this.setState( {timeSeries: data});
          this.setState( {loaded: true});
          


        });
    }

    handleSelect = (evtKey, evt) => {
        // Get the selectedIndex in the evtKey variable
        var regionTs = this.getTimeSeriesforState(evtKey);
        //alert (regionTs);

        history.push('/region/'+evtKey);//.toLowerCase()
        this.setState( {region: evtKey});
        this.setState ({regionDisplay:this.getDisplayNameForState(evtKey)})
        this.setState( {regionTimeSeries:regionTs });
    }

    getTimeSeriesforState(state){   
          var key;
          state = state.replace(/ /g, "-");
          state = state.toLowerCase();
          if (state === "unitedstates")
          {
            key = "unitedstates";
          }
          else
          {
            key =  state;
          }
          //alert(key);
         
          return this.state.timeSeries[key];     
      };


    getStates(){   
        //alert(this.state.timeSeries);
        var ar = new Array(); 
        var region; 
        var regionKey;
          for (var key in this.state.timeSeries) {                

                    // alert(key);
                    regionKey = key.replace(/_unitedstates/g, ""); 
                    region = this.getDisplayNameForState(regionKey);

                    if (regionKey.search("0") === -1)
                    {
                      ar.push([regionKey,region]);
                    }
          }   
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

    getDisplayNameForState(state){   
        state = state.replace(/ /g, "-");
        for (var obj in StateData) {                
                  //console.log(key + " -> " + data1[0].TimeSeries[key]);
                  //alert(JSON.stringify(this.state.timeSeries[obj]));
                  //alert (state);
                  if (StateData[obj]["State"].toLowerCase() === state.toLowerCase())
                  {     
                    if (StateData[obj].DisplayName != null)
                    {
                      return StateData[obj].DisplayName;     
                    }
                    else
                    {
                      return state[0].toUpperCase() + state.substr(1);
                    }
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

            //alert (JSON.stringify(regionTimeSeries));
            lastDate = regionTimeSeries.length-1;

            var currentCases = regionTimeSeries[lastDate].confirmed; 
            var priorCases = regionTimeSeries[lastDate-1].confirmed;  


            let statesDropDownItems = statesArray.map((item) =>
                <Dropdown.Item eventKey={item[0]}>{item[1]}</Dropdown.Item>
                );
            return (
                <Container className="p-3">    
                {/* <AppNavbar/>    */}
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">US Coronavirus Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="justify-content-end">
                        <Nav.Item>
                        <DropdownButton id="dropdown-basic-button" 
                                            title={this.getDisplayNameForState(this.state.region)} onSelect={this.handleSelect}>
                                            <Dropdown.Item eventKey={'unitedstates'}>United States</Dropdown.Item>
                                            <Dropdown.Divider />
                                            {statesDropDownItems}
                                    </DropdownButton>
                        </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    <RegionHeader currentCases = {currentCases} priorCases={priorCases} 
                        population = {population} region = {this.state.region} regionDisplay = {this.state.regionDisplay}/>
                    {/* <h1 className="header">{this.state.region}</h1>
                    <h6>{currentCasesString } total cases ({pctPopulation}% of population)</h6>                    
                    <h6>{newCasesString } new cases ({newCasesPercentIncrease}% increase)</h6> */}
                    
                    <br/>
                    <TimeSeriesChart region={this.state.region} 
                        timeSeries={this.state.timeSeries} />   
                    <TimeSeriesTable region={this.state.region} 
                        timeSeries={this.state.timeSeries} />   

                        <div>Data from <a href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">The New York Times</a>, based on reports from state and local health agencies.</div>           
                </Container>
            );

            }
    }    
}

export default State;
