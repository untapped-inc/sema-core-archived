import React, { Component } from 'react';
import 'App.css';
import 'css/SeamaInventoryManagement.css';

class SeamaInventoryManagement extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("SeamaSales - Constructor");
    }

    render() {
         return this.showInventoryManagement();
    }

    showInventoryManagement(){
        return (
            <div className="InventoryManagement">
                <img src = {require('images/seama-distribution-mock.png')} alt="" style={{marginLeft:"auto", marginRight:"auto"}}></img>
                {/*<h2 style={{textAlign:"center", color:"white"}}>Not Yet Implemented</h2>*/}
            </div>
        );

    }
}

export default SeamaInventoryManagement;
