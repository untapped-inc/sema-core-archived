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

  renderLinks() {
    const currentPath = this.props.location.pathname;

    const dashboardRoutes = [
      {
        path: '/',
        name: 'Users',
        icon: 'glyphicon-user'
      },
      {
        path: '/products',
        name: 'Products',
        icon: 'glyphicon-shopping-cart'
      },
      {
        path: '#',
        name: 'Kiosks',
        icon: 'glyphicon-home'
      }
    ];

    return (
      <ul className="nav nav-sidebar">
        {dashboardRoutes.map(route => (
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
        ))}
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
