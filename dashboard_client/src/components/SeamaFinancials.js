import React, { Component } from 'react';
import 'App.css';
import 'css/SeamaFinancials.css';

class SeamaFinancials extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("SeamaSales - Constructor");
    }

    render() {
        return this.showFinancials();
    }

    showFinancials(){
        return (
            <div className="Financials">
                <img src = {require('images/seama-financials-mock.png')} alt="" style={{marginLeft:"auto", marginRight:"auto"}}></img>
                {/*<h2 style={{textAlign:"center", color:"white"}}>Not Yet Implemented</h2>*/}
            </div>
        );

    }
}

export default SeamaFinancials;
