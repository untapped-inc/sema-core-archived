
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'App.css';
import 'css/SemaWaterOperations.css';
import {Table } from 'react-bootstrap';

let dateFormat = require('dateformat');

class SemaSummaryPanel2 extends Component {
    render() {
        return (
        	<div style={{width:"90%"}}>
					<Panel className="WaterQualitySummaryPanel">
						<Table >
							<tbody>
								<tr>
									<td className="WaterOpTableRow1Col1">{this.populateRow1Col1()}</td>
									<td className="WaterOpTableRow1Col2to4">{this.populateRow1Col2()}</td>
									<td className="WaterOpTableRow1Col2to4">{this.populateRow1Col3()}</td>
									<td className="WaterOpTableRow1Col2to4">{this.populateRow1Col4()}</td>
								</tr>
								<tr>
									<td style={{border:"none", paddingBottom:0, paddingTop:3}}>{this.populateRow2Col1()}</td>
									<td className="WaterOpTableRow2Col2to4">{this.populateRow2Col2()}</td>
									<td className="WaterOpTableRow2Col2to4">{this.populateRow2Col3()}</td>
									<td className="WaterOpTableRow2Col2to4">{this.populateRow2Col4()}</td>
								</tr>
							</tbody>
						</Table>
						<p style={{textAlign:"center"}}>{this.populateDate()}</p>
					</Panel>
			</div>
        );
    }
	populateRow1Col1(){
        if( this.props.type === "pressure"){
        	return "Pressure";
		}else{
			return "Flowrate";
		}
    }

	populateRow1Col2(){
		if( this.props.type === "pressure"){
			return "Membrane Feed";
		}else{
			return "Feed Flow Rate";
		}
	}

	populateRow1Col3(){
		if( this.props.type === "pressure"){
			return "Pre-Filter In";
		}else{
			return "Product Flow Rate";
		}
	}

	populateRow1Col4(){
		if( this.props.type === "pressure"){
			return "Pre-Filter Out";
		}else{
			return "";
		}
	}

	populateRow2Col1(){
		if( this.props.type === "pressure"){
			return "Units: PSI";
		}else{
			return "Units: GPM";
		}
	}

	populateRow2Col2(){
		if( this.props.type === "pressure"){
			return this.props.data.sitePressureMembrane.value;
		}else{
			return this.props.data.flowRateFeed.value;
		}
	}

	populateRow2Col3(){
		if( this.props.type === "pressure"){
			return this.props.data.sitePressureIn.value;
		}else{
			return this.props.data.flowRateProduct.value;
		}
	}

	populateRow2Col4(){
		if( this.props.type === "pressure"){
			return this.props.data.sitePressureOut.value;
		}else{
			return "";
		}
	}

	populateDate(){
    	let dateVal = null;
		if( this.props.type === "pressure"){
			dateVal = this.props.data.sitePressureMembrane.date;
		}else{
			dateVal = this.props.data.flowRateProduct.date;
		}
		if( dateVal === "N/A"){
			return "";
		}
		return this.formatDate(dateVal);
	}

	formatDate(dateVal){
		return  dateFormat((Date.parse(dateVal)), "dddd. mmm, d, yyyy");
	}

}
export default SemaSummaryPanel2;


// {/*<Panel className="WaterQualitySummaryPanel">*/}
// 	{/*<Panel.Body  style={{padding:"7px"}}>*/}
// 		{/*<Panel.Title componentClass="h3" style={{margin:"0"}}>{this.props.title}</Panel.Title>*/}
// 		{/*<p style={{fontSize:"large",margin:"0", color:this.props.valueColor }}>{this.format()}   <span style={{fontSize:"medium",margin:"0", color:"black" }}>{this.props.units}</span></p>*/}
// 		{/*<p style={{margin:"0"}}>{this.formatDate()}</p>*/}
// 	{/*</Panel.Body>*/}
// {/*</Panel>*/}
// {/*</div>*/}
