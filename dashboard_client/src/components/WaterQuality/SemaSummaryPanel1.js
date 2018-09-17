
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'App.css';
import 'css/SemaWaterOperations.css';
let dateFormat = require('dateformat');

class SemaSummaryPanel1 extends Component {
    render() {
        return (<div style={{width:"90%"}}>
                <Panel className="WaterQualitySummaryPanel">
                    <Panel.Body  style={{padding:"7px"}}>
                        <Panel.Title componentClass="h3" style={{margin:"0"}}>{this.props.title}</Panel.Title>
						<p style={{fontSize:"large",margin:"0", color:this.props.valueColor }}>{this.format()}   <span style={{fontSize:"medium",margin:"0", color:"black" }}>{this.props.units}</span></p>
						<p style={{margin:"0"}}>{this.formatDate()}</p>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
    format(){
        if( typeof this.props.value === "string") return this.props.value;
        return Math.round(this.props.value);
    }
	formatDate(){
    	console.log(this);
		if( this.props.date === "N/A") return "";
		return  dateFormat((Date.parse(this.props.date)), "ddd. mmm, d, yyyy");
	}

}
export default SemaSummaryPanel1;


