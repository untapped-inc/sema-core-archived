import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PropTypes from "prop-types";

import semaHeaderStyle1 from "variables/semaStyles/semaHeaderStyle1";
import {withStyles} from "material-ui";
import * as seamaUserActions from "actions";

import SeamaKioskList from "./SeamaKioskList";

class LoggedInUser extends React.Component {
    constructor( props) {
        super(props);
        this. _handleClick = this. _handleClick.bind(this);
    }

    render() {
        return <div style={{height:"30px", width:"200px", margin:"0 auto"}} onClick={this._handleClick}>
            Hello, {this.props.seamaUser}.
        </div>;
    }
    _handleClick() {
        console.log("hello foo");
        this.props.seamaUserActions.fetchSeamaUser();
    }
}


class SeamaHeader1 extends React.Component {

    constructor( props)
    {
        super(props);
    }
    render() {
        return (
            <div className="semaHeaderStyle">
                <LoggedInUser {...this.props}/>
                <SeamaKioskList {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        seamaUser: state.seamaUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        seamaUserActions: bindActionCreators(seamaUserActions, dispatch)
    };
}

SeamaHeader1.propTypes = {
    seamaUserActions: PropTypes.object,
    seamaUser: PropTypes.string
};

// export default withStyles(semaHeaderStyle1)(SeamaHeader1);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SeamaHeader1);
