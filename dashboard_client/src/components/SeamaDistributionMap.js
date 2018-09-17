import React, { Component } from 'react';
import 'App.css';
import 'css/SeamaDistributionMap.css';

class SeamaDistributionMap extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("SeamaDistributionMap - Constructor");
    }

    render() {
        return this.showDistributionMap();
    }

    showDistributionMap(){
        return (
            <div className="DistributionMap">
                <img src = {require('images/seama-distribution-mock.png')} alt="" style={{marginLeft:"auto", marginRight:"auto"}}></img>
                {/*<h2 style={{textAlign:"center", color:"white"}}>Not Yet Implemented</h2>*/}
            </div>
        );

    }
}

export default SeamaDistributionMap;
