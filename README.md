This file contains instructions on installing, building and deploying the DloHaiti dashboard application. The directions are for Mac OSX and GNU/Linux.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Server build](#server-build)
- [Client build](#client-build)
- [Production Deployment](#production-deployment)


## Prerequisites
### Mac OSX
* Install Homebrew (Homebrew is used to install other components):
https://treehouse.github.io/installation-guides/mac/homebrew
* Install Node and npm: `brew install node`
* Install Yarn: `brew install yarn`
* Install react-scripts (To be able to run the client): `yarn global add react-scripts`
* Clone the Git repository to a local folder: `git clone https://github.com/FredOleary/dlodashboard1.git sema`

### GNU/Linux
* Install Node and npm: [Follow depending on your distro](https://nodejs.org/en/download/package-manager/)
* Install Yarn: `npm i -g yarn`
* Install react-scripts (To be able to run the client): `yarn global add react-scripts`
* Clone the Git repository to a local folder: `git clone https://github.com/FredOleary/dlodashboard1.git sema`

## Server build
The server uses Expressjs
* Change to report_server folder: `cd report_server`
* Install components: `yarn`
* Start the server on port 3001: `yarn start`. Note that client is configured to access the server on port 3001
* Test the server access via curl: `curl http://localhost:3001/untapped/health-check` this should return {"server":"Ok","database":"Ok"}

## Client build
The client is a React application
* Change to report_client folder: `cd report_client`
* Install components: `yarn`
* Start the client on the default port, 3000: `yarn start`
* You should now see the login page
* Note: The client uses a custom Bootstrap theme located at ./report_client/src/css/bootstrap_cerulean.min.css. There is a postInstall script, update_theme.sh, that should copy this theme to the folder ./report_client/node_modules/bootstrap/dist/css/bootstrap_cerulean.min.css. Run it with `sh update_theme.sh`.

In development mode, the dashboard server runs on locathost:3001 and the React App on port 3000. REST calls from the app to the server are proxied through port 3001.

## Production Deployment
In production mode, the dashboard server runs on sema.untapped-inc.com and the React app is built then rendered by the server. REST calls from the app to the server are reverse proxied by Ngninx from port 80 to port 3001. We use pm2 to run the server.

### Prerequisites

Our servers are in Linux so installation methods will be for GNU/Linux:

* Install Node and npm: [Follow depending on your distro](https://nodejs.org/en/download/package-manager/)
* Install Yarn: `npm i -g yarn`
* Install react-scripts (To be able to build the client): `yarn global add react-scripts`
* Clone the Git repository to the server: `git clone https://github.com/FredOleary/dlodashboard1.git sema`
* Nginx (Reverse Proxy): `sudo apt install nginx`
* Pm2 (Robust Process Manager): `yarn global add pm2`

### Deploying to Production

Follow those steps to deploy this app in production mode:
 * In the report_client folder Make sure to use the `package.json` without the proxy config - not `package.dev.json`
 * Install client dependencies: `cd report_client && yarn`
 * Build the client: `cd report_client && yarn build`
 * Create a new `public_react` folder into the server directory: `mkdir report_server/public_react`
 * Copy the entire build folder from react_client/build to the report_server/public_react folder:
     `cp -rf report_client/build report_server/public_react`
* Install server dependencies: `cd report_server && yarn`
* Start the server with Pm2: `cd report_server && pm2 start bin/www`
* Test the server access via curl - Since we haven't configured Nginx yet, we'll test it from port 3001: `curl http://sema.untapped-inc.com:3001/untapped/health-check` this should return {"server":"Ok","database":"Ok"}
* Setup Ngninx using [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
* Configure Nginx by editing - *WITH SUPER USER*: `/etc/nginx/sites-available/default`:
    `sudo vim /etc/nginx/sites-available/default`
Within the server block, there is an existing `location /` block. Replace the contents of that block with the following configuration:
```
location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
* Make sure you didn't introduce any syntax errors: `sudo nginx -t`
* Restart Nginx: `sudo systemctl restart nginx`
* Visit the dashboard website at http://sema.untapped-inc.com

## TODO
- [ ] Production: Add SSL certification support with Let's Encrypt
- [ ] Production: Make sure we only use logs and error printing only in development mode
- [ ] Production: Use a `.env` file
