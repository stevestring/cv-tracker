import React from 'react';
import { TimeSeries, Index } from "pondjs";

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler 
} from "react-timeseries-charts";

import data1 from './download1.json';

function getTimeSeriesforState(state){      
      
    for (var obj in data1) {                
            //console.log(key + " -> " + data1[0].TimeSeries[key]);
            //console.log(obj);
            if (data1[obj]["Province/State"] === state)
            {
                //alert(state);
                return data1[obj].TimeSeries;     
            }
    }
    
}; 

function transFormJSON(){      
    var ar = new Array();    
    var jsonTs =  getTimeSeriesforState("Maryland")
    for (var key in jsonTs) {               
            //console.log(key + " -> " + data1[0].TimeSeries[key]);
            ar.push([key,jsonTs[key]]);      
    }
    console.log (ar);
    return ar 
};  

const series = new TimeSeries({
    name: "cv_cases",
    columns: ["index", "cases"],
    points: transFormJSON().map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
});

class TimeSeriesChart extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          timeSeries: null
        };
      }

    componentDidMount() {        
    
        this.setState({
            timeSeries: series   
        });
    }
    
    
    render() {
      const style = styler([{ key: "cases", color: "red", selected: "#2CB1CF" }]);
      return (
        
  <ChartContainer timeRange={series.range()}>
                                <ChartRow height="250" title="Maryland">
                                    <YAxis
                                        id="cases"
                                        // label="Open Cases"
                                        min={0}
                                        max={100}
                                        //format=".2f"
                                        width="70"
                                        type="linear"
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="cases"
                                            style={style}
                                            spacing={1}
                                            columns={["cases"]}
                                            series={series}
                                            minBarHeight={1}
                                        />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer> 
        
      )}
    
}

export default TimeSeriesChart;