This file contains very preliminary instructions on installing, building and deploying the DloHaiti dashboard application. The Directions are for Mac OSX


## Table of Contents
- [Prerequisites](#prerequisites)
- [Server build](#server-build)
- [Client build](#client-build)
- [Production Deployment](#Production Deployment)


## Prerequisites
* Install Homebrew. (Homebrew is used to install other components)
https://treehouse.github.io/installation-guides/mac/homebrew
* Install Node `brew install node`
* Install Yarn `brew install yarn`
* Clone the Git repositary from https://github.com/FredOleary/dlodashboard1.git to a local folder ` git clone https://github.com/FredOleary/dlodashboard1.git dlodashboard`


## Server build
The server uses Expressjs
* Change to report_server folder `cd report_server`
* Install components `yarn install`
* Start the server on port 3001 `PORT=3001 node bin/www`. Note that client is configured to access the server on port 3001

## Client build
The server uses React
* Change to report_client folder `cd report_client`
* Install components `yarn install`
* Start the client on the default port, 3000 `yarn start`
* You should now see the login page

## Production Deployment
In the development mode, the dashboard server runs on locathost:3001 and the React App on port 3000. REST calls from the app to the server are proxied through port 3001. When deploying the client, COMMENT OUT THE PROXY statement in react_clinet/package.json:
 ` // proxy": "http://localhost:3001`
 * Comment out the proxy statement in react_clinet/package.json as described above
 * Build client `yarn build`
 * Copy the entire build folder from react_client/build to the report_server folder public_react folder. The folder layout of report_server should like:

 report_server<br/>
 +++ report_server<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;... bin<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;... node_modules<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;... public_react<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... build<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... asset-manifest.json<br/>
