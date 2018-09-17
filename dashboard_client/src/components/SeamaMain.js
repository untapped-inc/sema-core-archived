import React from 'react';
import { Switch } from 'react-router-dom';
import SeamaWaterQuality from "./SemaWaterOperations";
import SemaSales from "./SemaSales";
import SeamaDistributionMap from "./SeamaDistributionMap";
import SeamaDeliverySchedule from "./SeamaDeliverySchedule";
import SeamaInventoryManagement from "./SeamaInventoryManagement";
import SeamaFinancials from "./SeamaFinancials";
import {
	PrivateRoute,
	SemaNotFound
} from './';

const Main = (props) => (
    <main>
        <Switch>
            <PrivateRoute exact path='/' component={SeamaWaterQuality}/>
            <PrivateRoute path='/Sales' component={SemaSales}/>
            <PrivateRoute path='/DistributionMap' component={SeamaDistributionMap}/>
            <PrivateRoute path='/DeliverySchedule' component={SeamaDeliverySchedule}/>
            <PrivateRoute path='/InventoryManagement' component={SeamaInventoryManagement}/>
            <PrivateRoute path='/Financials' component={SeamaFinancials}/>
            <PrivateRoute component={SemaNotFound}/>
        </Switch>
    </main>
);

export default Main
