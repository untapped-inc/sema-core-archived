import React from 'react';
import { Switch } from 'react-router-dom';
import SemaUsers from './SemaUsers';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import SemaWaterOperations from "./reports/SemaWaterOperations";
import { PrivateRoute, SemaNotFound } from '.';

const Routes = props => (
  <Switch>
    <PrivateRoute exact path='/' component={SemaWaterOperations}/>
    <PrivateRoute allowed={['admin']} exact path="/users" component={SemaUsers} />

    <PrivateRoute allowed={['admin']} exact path="/products" component={ProductList} />
    <PrivateRoute allowed={['admin']} exact path="/products/create" component={ProductDetails} />
    <PrivateRoute allowed={['admin']} path="/products/:id" component={ProductDetails} />

    <PrivateRoute component={SemaNotFound} />
  </Switch>
);

export default Routes;
