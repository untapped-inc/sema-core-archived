import React, { Component } from 'react';
import 'App.css';
import 'css/SeamaDeliverySchedule.css';

class SeamaDeliverySchedule extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("SeamaDistributionMap - Constructor");
    }

    render() {
        return this.showDeliverySchedule();
    }

    showDeliverySchedule(){
        return (
            <div className="DeliverySchedule">
                <img src = {require('images/seama-distribution-mock.png')} alt="" style={{marginLeft:"auto", marginRight:"auto"}}></img>
                {/*<h2 style={{textAlign:"center", color:"white"}}>Not Yet Implemented</h2>*/}
            </div>
        );

    }
}

export default SeamaDeliverySchedule;
