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


class TimeSeriesChart extends React.Component {
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

    createTimeseries(region)
    { 
        return new TimeSeries({
            name: "cv_cases",
            columns: ["index", "cases"],
            points: this.transFormJSON(region).map(([d, value]) => [Index.getIndexString("1h", new Date(d)), parseInt( value)])
        });
    }

    getTimeSeriesforState(state){   
      //alert(this.state.timeSeries);
        for (var obj in this.state.timeSeries) {                
                //console.log(key + " -> " + data1[0].TimeSeries[key]);
                //alert(JSON.stringify(this.state.timeSeries[obj]));
                if (this.state.timeSeries[obj]["Province/State"].toLowerCase() === state.toLowerCase())
                {
                    return this.state.timeSeries[obj].TimeSeries;     
                }
        }    
    }; 
    
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

    render() {

        if(!this.state.loaded)
        {
            return null;
        }
        else
        {


      const timeSeries = this.createTimeseries(this.props.region);
      const style = styler([{ key: "cases", color: "red",width: 4, selected: "#2CB1CF" }]);
      //alert (timeSeries.min("cases") +":"+ timeSeries.max("cases"));
      return (
        <Resizable>            
  <ChartContainer timeRange={timeSeries.range()} format="%m/%d" timeAxisTickCount={5}>
                                <ChartRow height="300">
                                    <YAxis
                                        id="cases"
                                        min={0}
                                        max={timeSeries.max("cases")}
                                        type="linear"
                                        width = {0}
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
                                        width = {0}
                                    />
                                </ChartRow>
                            </ChartContainer> 
                            </Resizable>
      )}}
    
}

export default TimeSeriesChart;