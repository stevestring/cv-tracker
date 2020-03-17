import React from 'react';
import { TimeSeries, Index } from "pondjs";

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler,
    Resizable 
} from "react-timeseries-charts";

import data1 from './download1.json';

function getTimeSeriesforState(state){      
      
    for (var obj in data1) {                
            //console.log(key + " -> " + data1[0].TimeSeries[key]);
            //console.log(obj);
            if (data1[obj]["Province/State"].toLowerCase() === state.toLowerCase())
            {
                //alert(state);
                return data1[obj].TimeSeries;     
            }
    }
    
}; 

function transFormJSON(region){      
    var ar = new Array();    
    
    region = region.replace(/-/g, " ");
    //region = region.replace(" MD",", MD");
    //alert(region);
    var jsonTs =  getTimeSeriesforState(region)
    for (var key in jsonTs) {               
            //console.log(key + " -> " + data1[0].TimeSeries[key]);
            if (Date.parse(key)>Date.parse('3/08/2020'))
        {
            ar.push([key,jsonTs[key]]);  
        }    
    }
    console.log (ar);
    return ar 
};  


class TimeSeriesChart extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          timeSeries: null
        };
      }

    // componentDidMount() {        

    //     createTimeseries().then(response => {
    //         this.setState({
    //           timeSeries: response
    //         });
    
    //     });
    // }

    createTimeseries(region)
    { return new TimeSeries({
            name: "cv_cases",
            columns: ["index", "cases"],
            points: transFormJSON(region).map(([d, value]) => [Index.getIndexString("1h", new Date(d)), parseInt( value)])
        });
    }
    
    render() {
      const timeSeries = this.createTimeseries(this.props.region);
      const style = styler([{ key: "cases", color: "red",width: 4, selected: "#2CB1CF" }]);
      //alert (timeSeries.min("cases") +":"+ timeSeries.max("cases"));
      return (
        <Resizable>            
  <ChartContainer timeRange={timeSeries.range()}>
                                <ChartRow height="300">
                                    <YAxis
                                        id="cases"
                                        min={0}
                                        max={timeSeries.max("cases")}
                                        type="linear"
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="cases"
                                            style={style}
                                            spacing={1}
                                            columns={["cases"]}
                                            series={timeSeries}
                                            minBarHeight={1}
                                        />
                                    </Charts>
                                    <YAxis
                                        id="cases"
                                        min={0}
                                        max={timeSeries.max("cases")}
                                        type="linear"
                                    />
                                </ChartRow>
                            </ChartContainer> 
                            </Resizable>
      )}
    
}

export default TimeSeriesChart;