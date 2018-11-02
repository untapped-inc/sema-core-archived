import React from 'react';
import { Switch } from 'react-router-dom';
import SemaUsers from './SemaUsers';
import ProductsContainer from '../containers/ProductsContainer';
import { PrivateRoute, SemaNotFound } from '.';

const Routes = props => (
  <Switch>
    <PrivateRoute exact path="/" component={SemaUsers} />
    <PrivateRoute path="/products" component={ProductsContainer} />
    <PrivateRoute component={SemaNotFound} />
  </Switch>
);

export default Routes;
