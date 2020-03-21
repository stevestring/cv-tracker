import React from 'react';
import { TimeSeries, Index } from "pondjs";
import Table from 'react-bootstrap/Table';
import StateData from './StateData.json';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class TimeSeriesTable extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          timeSeries:null
          //timeSeries: [{"Province/State": "Maryland","TimeSeries": {"3/22/20": "0", "3/23/20": "0"} },{"Province/State": "New South Wales","TimeSeries": {"3/22/20": "0", "3/23/20": "0"}}]

        };
    }


    componentDidMount()
    {
          this.setState( {timeSeries: this.props.timeSeries});
          this.setState( {loaded: true});
          //alert(this.state.timeSeries);
    }



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
      }; 

    transFormJSON(region){      
        var ar = new Array();            
        region = region.replace(/-/g, " ");
        //region = region.replace(" MD",", MD");
        //alert(region);
        var jsonTs =  this.getTimeSeriesforState(region)
        var current = 0;
        var last = 0;
        var change=0;
        var pctChange=0;
        var pctPopulation =0;
        var population = this.getPopulationForState(region);

        //alert (pctPopulation);
        for (var key in jsonTs) {    
            if (Date.parse(key)>Date.parse('3/08/2020'))
            {   
                current = jsonTs[key]
                change = current - last;
                pctChange = Math.round(change/last*100); 
                pctPopulation = Math.round(current/population*100*10000)/10000;
                ar.push([key,current,change,pctChange,pctPopulation]);  
                last = current;     
            }    
        }
        //alert(JSON.stringify(ar));
        //console.log (ar);
        return ar.reverse();
    };  

    render() {

        if(!this.state.loaded)
        {
            return null;
        }
        else
        {

      const timeSeries = this.transFormJSON(this.props.region);
 
      return (
          <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Confirmed Cases</th>
                    <th>% of Population ({this.getPopulationForState(this.props.region).toLocaleString('en')})</th>
                    <th>Change</th>
                    <th>% Change</th>
                </tr>
            </thead>
            <tbody>
            {timeSeries.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[4]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    
                                </tr>
                            )
                        })}
            </tbody>
            </Table>   
            </Col>       
            </Row>
      )}
    }
    
}

export default TimeSeriesTable;