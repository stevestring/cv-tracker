import React from 'react';


class RegionHeader extends React.Component {

    render() {  
        //alert (this.props.priorCases);
        var newCases = this.props.currentCases-this.props.priorCases;
        var newCasesPercentIncrease = Math.round(newCases/this.props.priorCases*100);
        var pctPopulation = Math.round(this.props.currentCases/this.props.population*100*10000)/10000
        var newCasesString;
        var currentCasesString ;

        if (newCases!= null) 
        {
          newCasesString = newCases.toLocaleString('en')
        } 
        if (this.props.currentCases!= null) 
        {
          currentCasesString = this.props.currentCases.toLocaleString('en');
        }

        if (this.props.currentCases==null)
        {
            return null;
        }
        else{
            return (
                <div>
                <h1 className="header">{this.props.regionDisplay}</h1>
                <h6>{currentCasesString} total cases ({pctPopulation}% of population)</h6>                    
                <h6>{newCasesString} new cases ({newCasesPercentIncrease}% increase)</h6>
                </div>
            );
        }
    }
}
export default RegionHeader;