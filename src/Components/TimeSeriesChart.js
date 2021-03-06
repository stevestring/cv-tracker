import React from 'react';
import { TimeSeries, Index } from "pondjs";
import { format } from "d3-format";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler,
    Resizable,
    ScatterChart
} from "react-timeseries-charts";


class TimeSeriesChart extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          loaded: false,
          timeSeries:null,
          highlight: null
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
    
    transFormJSON(region){      
        var ar = new Array();            
        region = region.replace(/-/g, " ");

        //alert(JSON.stringify(this.state.timeSeries));
        var jsonTs =  this.getTimeSeriesforState(region);

        for (var i=0; i<jsonTs.length;i++) {               

            if (Date.parse(jsonTs[i].date)>Date.parse('3/08/2020'))
            {
                ar.push([jsonTs[i].date,jsonTs[i].confirmed]);  
            }    
        }
        //alert(JSON.stringify(ar));
        console.log (ar);
        return ar 
    };  

 
    handleMouseNear = point => {
        //alert ("mouse near");
        this.setState({
            highlight: point
        });
    };

    render() {

        if(!this.state.loaded)
        {
            return null;
        }
        else
        {


      const timeSeries = this.createTimeseries(this.props.region);
      const style = styler([{ key: "cases", color: "red",
      width: 4, selected: "#2CB1CF"}]);
      //alert (timeSeries.min("cases") +":"+ timeSeries.max("cases"));
      const highlight = this.state.highlight;
      const formatter = format(",");      
      let infoValues = [];
      if (highlight) {
        const speedText = `${formatter(highlight.event.get(highlight.column))}`;
        infoValues = [{ label: "Cases", value: speedText }];
      }
      return (
        <Resizable>            
  <ChartContainer timeRange={timeSeries.range()} format="%m/%d" timeAxisTickCount={5}>
                                <ChartRow height="300"
                                >
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
                                        <ScatterChart
                                            radius = {4.0}
                                            axis="cases"
                                            style={style}
                                            spacing={1}
                                            columns={["cases"]}
                                            series={timeSeries}  
                                            info={infoValues}
                                            infoHeight={28}
                                            infoWidth={110}
                                            infoOffsetY={10}
                                            infoTimeFormat="%m/%d/%Y"
                                            // infoStyle={{ box: {
                                            //     fill: "black",
                                            //     color: "#DDD"
                                            // }}}                                    
                                            selected={this.state.selection}
                                            onMouseNear={p => this.handleMouseNear(p)}
                                            highlight={this.state.highlight}
                           
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