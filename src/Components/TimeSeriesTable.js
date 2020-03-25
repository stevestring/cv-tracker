import React from 'react';

import Table from 'react-bootstrap/Table';
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
        var key;
        state = state.replace(/ /g, "-");
        state = state.toLowerCase();
        if (state === "unitedstates")
        {
          key = "unitedstates";
        }
        else
        {
          key =  state+"_unitedstates";
        }
        //alert(key);
       
        return this.state.timeSeries[key];     
    };

    transFormJSON(region){      
        var ar = new Array();            
        region = region.replace(/-/g, " ");
        //region = region.replace(" MD",", MD");
        //alert(region);
        var jsonTs =  this.getTimeSeriesforState(region);
        var current = 0;
        var last = 0;
        var change=0;
        var pctChange=0;
 

        for (var i=0; i<jsonTs.length;i++) {               

            if (Date.parse(jsonTs[i].date)>Date.parse('3/08/2020'))
            {  
                //current = jsonTs[i].confirmed;
                //change = current - last;
                //pctChange = Math.round(change/last*100); 
                ar.push([jsonTs[i].date,jsonTs[i].confirmed,jsonTs[i].fatal,jsonTs[i].recovered,0]);  
                last = current; 
            }    
        }

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
          {/* <Col xs={1}></Col> */}
          <Col xs={12}>
        <Table striped bordered size="s">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Confirmed Cases</th>
                    {/* <th>% of Population ({this.getPopulationForState(this.props.region).toLocaleString('en')})</th> */}
                    <th>Deaths</th>
                    <th>Recoveries</th>
                </tr>
            </thead>
            <tbody>
            {timeSeries.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    {/* <td>{data[4]}</td> */}
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