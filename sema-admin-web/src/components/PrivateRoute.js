import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Currently, users can have multiple roles at the same time
const isUserAllowed = (currentUser, allowedRoles) => {
	const roles = currentUser.role;

	console.dir(allowedRoles);
	console.dir(roles);

	return roles.reduce((final, role) => {
		return allowedRoles.includes(role.code) || final;
	}, false);
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={ props => {
			const currentUser = JSON.parse(localStorage.getItem('currentUser'));

			// If there's no "allowed" prop or the user is allowed in, let them in
			if (!rest.allowed || isUserAllowed(currentUser, rest.allowed)) {
				return (<Component {...props} />);
			} else {
				console.log('ever?');
				return (<Redirect to={{ pathname: '/', state: { from: props.location } }} />);
			}
		}}
	/>
)
