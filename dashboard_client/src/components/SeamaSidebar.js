import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import 'App.css';

const SeamaSidebarStyle = {
    background:"rgb(24,55,106)",
//    position:"fixed",
    width:"240px",
    height:"100%",
    // top:"52px",
    // borderRight:"1px",
    // borderRightColor:"#e0e0e0",
    // borderRightStyle:"solid"
};

const SeamaListStyleActive = {
    textAlign:"left",
    paddingLeft:"20px",
    backgroundColor:"rgb(24,55,106)",
    color:"white"
};


const ImageStyle = {
    resize:"both",
    width:"240px",
    height:"80px",
	maxWidth: '100%',
	marginBottom: '5px'
};


function CustomComponent1({ children }) {
    return (
        <li className="list-group-item" style={SeamaListStyleActive}>
            {children}
        </li>
    );
}
// function CustomComponent2({ children }) {
//     return (
//         <li className="list-group-item" onClick={() => {}} style={SeamaListStyleInactive}>
//             {children}
//         </li>
//     );
// }

// class SeamaSidebar extends Component {
//     render() {
//         return (
//             <div className="SeamaNavSidebar" style={SeamaSidebarStyle}>
//                 <div>
//                     {<img src={require('images/sema-sidebar-logo.png')} alt="logo" style={ImageStyle} />}
//                 </div>
//                 <header>
//                     <nav>
//                         <ul>
//                             <li><Link to='/'>Water Operations</Link></li>
//                             <li><Link to='/Sales'>Sales</Link></li>
//                             <li><Link to='/DistributionMap'>Distribution Map</Link></li>
//                         </ul>
//                     </nav>
//                 </header>
//             </div>
//         );
//     }
// }

class SeamaSidebar extends Component {
    render() {
        return (
            <div className="SeamaNavSidebar" style={SeamaSidebarStyle}>
                <div>
                    {<img src={require('images/sema-sidebar-logo.png')} alt="logo" style={ImageStyle} />}
                </div>
                <ListGroup>
                    <CustomComponent1><i className="glyphicon glyphicon-map-marker" style={{paddingRight:"15px"}}/>
                        <Link to='/'>Water Operations</Link></CustomComponent1>
                    <CustomComponent1><i className="glyphicon glyphicon-shopping-cart" style={{paddingRight:"15px"}}/>
                        <Link to='/Sales'>Sales</Link></CustomComponent1>
                    <CustomComponent1><i className="glyphicon glyphicon-globe" style={{paddingRight:"15px"}}/>
                        <Link to='/DistributionMap'>Distribution Map</Link></CustomComponent1>
                    <CustomComponent1><i className="glyphicon glyphicon-time" style={{paddingRight:"15px"}}/>
                        <Link to='/DeliverySchedule'>Delivery Schedule</Link></CustomComponent1>
                    <CustomComponent1><i className="glyphicon glyphicon-inbox" style={{paddingRight:"15px"}}/>
                        <Link to='/InventoryManagement'>Inventory Management</Link></CustomComponent1>
                    <CustomComponent1><i className="glyphicon glyphicon-usd" style={{paddingRight:"15px"}}/>
                        <Link to='/Financials'>Financials</Link></CustomComponent1>
                </ListGroup>
            </div>
        );
    }
}


export default SeamaSidebar;
