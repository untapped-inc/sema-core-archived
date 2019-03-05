import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from 'images/swe-logo.png';
import 'App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions, healthCheckActions } from 'actions';

class SeamaSidebar extends Component {
  _getClassNames(route, currentPath) {
    return `${route.path === currentPath && 'active'}`;
  }

  // Currently, users can have multiple roles at the same time
  _isUserAllowed (currentUser, allowedRoles) {
    const roles = currentUser.role;

    return roles.reduce((final, role) => {
      return allowedRoles.includes(role.code) || final;
    }, false);
  };

  renderLinks() {
    const currentPath = this.props.location.pathname;

    const dashboardRoutes = [
      {
        path: '/',
        name: 'Water Operations',
        icon: 'glyphicon-map-marker'
      },
      {
        path: '/sales',
        name: 'Sales',
        icon: 'glyphicon-shopping-cart'
      },
      {
        path: '/volumes',
        name: 'Volumes',
        icon: 'glyphicon-tint'
      },
      {
        path: '/demographics',
        name: 'Demographics',
        icon: 'glyphicon-stats'
      },
      {
        path: '/users',
        name: 'Users',
        icon: 'glyphicon-user',
        isAdminFeature: true
      },
      {
        path: '/products',
        name: 'Products',
        icon: 'glyphicon-shopping-cart',
        isAdminFeature: true
      },
      {
        path: '/data-export',
        name: 'Data Export',
        icon: 'glyphicon-download',
        isAdminFeature: true
      },
      // {
      //   path: '#',
      //   name: 'Kiosks',
      //   icon: 'glyphicon-home',
      //   isAdminFeature: true
      // }
    ];

    return (
      <ul className="nav nav-sidebar">
        {dashboardRoutes.map(route => {

          if (route.isAdminFeature) {
            if (!this._isUserAllowed(this.props.currentUser, ['admin'])) {
              return null;
            }
          }

          return (
            <li
              key={route.name}
              className={this._getClassNames(route, currentPath)}
            >
              <Link to={route.path}>
                <i
                  className={`glyphicon ${route.icon}`}
                  style={{ paddingRight: '20px' }}
                />
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div>{<img src={logo} alt="logo" />}</div>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    healthCheckActions: bindActionCreators(healthCheckActions, dispatch)
  };
}

const connectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeamaSidebar);

export default withRouter(connectedSidebar);
