import React, { Component } from 'react';
import 'App.css';
import SemaServiceError from "../SemaServiceError";
import SemaDatabaseError from "../SemaDatabaseError";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as healthCheckActions from 'actions/healthCheckActions';
import { withRouter } from 'react-router';
import '../../css/DataExport.css';
import LoadProgress from "../LoadProgress";

import $ from 'jquery';
import 'selectize';
import '../../../node_modules/selectize/dist/css/selectize.css';

class DataExport extends Component {
	render() {
		return this.showContent();
	}

	showContent(props) {
		if (this.props.healthCheck.server !== "Ok") {
			return SemaServiceError(props);
		} else if (this.props.healthCheck.database !== "Ok") {
			return SemaDatabaseError(props)
		}
		return this.showDataExport();

	}

	componentDidMount() {
		$('select').selectize();
	}

	showDataExport() {
		return (
			<div className="DataExportContainer" style={this.getHeight()}>
				<div className="DataExportContent">
					<div class="well well-lg DataExportWell">
						<select
							id="select-dataset"
							class="selectized"
							placeholder="Select a dataset">
								<option value="1" selected>Year to Date Sales Data</option>
								<option value="2">Year to Date Water Quality Data</option>
						</select>
					</div>
				</div>
			</div>
		);
	}

	getHeight() {
		let windowHeight = window.innerHeight;
		// TODO 52px is the height of the toolbar. (Empirical)
		windowHeight -= 52;
		let height = windowHeight.toString() + 'px';
		return { height: height }
	}

}

function mapStateToProps(state) {
	return {
		water: state.waterOperations,
		healthCheck: state.healthCheck
	};
}

function mapDispatchToProps(dispatch) {
	return {
		healthCheckActions: bindActionCreators(healthCheckActions, dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(DataExport));

