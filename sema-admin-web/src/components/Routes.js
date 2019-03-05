import React from 'react';
import { Switch } from 'react-router-dom';
import SemaUsers from './SemaUsers';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import SemaWaterOperations from "./reports/SemaWaterOperations";
import SemaSales from "./reports/SemaSales";
import SemaVolume from "./reports/SemaVolume";
import SemaDemographics from "./reports/SemaDemographics";
import DataExport from "./DataExport";
import { PrivateRoute, SemaNotFound } from '.';

const Routes = props => (
  <Switch>
    <PrivateRoute exact path='/' component={SemaWaterOperations}/>
    <PrivateRoute exact path='/sales' component={SemaSales}/>
    <PrivateRoute exact path='/volumes' component={SemaVolume}/>
    <PrivateRoute exact path='/demographics' component={SemaDemographics}/>
    <PrivateRoute allowed={['admin']} exact path="/users" component={SemaUsers} />

    <PrivateRoute allowed={['admin']} exact path="/products" component={ProductList} />
    <PrivateRoute allowed={['admin']} exact path="/products/create" component={ProductDetails} />
    <PrivateRoute allowed={['admin']} path="/products/:id" component={ProductDetails} />
    <PrivateRoute allowed={['admin']} exact path="/data-export" component={DataExport} />

    <PrivateRoute component={SemaNotFound} />
  </Switch>
);

export default Routes;
