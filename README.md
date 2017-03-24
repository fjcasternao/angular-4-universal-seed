# Minimal Starter with Angular on both Server and Browser Platforms

## Get Started
```sh
npm run start
```
## Developement mode
* Terminal 1: ```npm run watch```
* Wait for the build to finish
* Terminal 2: ```npm run server```

## Production (deployed on a live server)
Follow these steps to deploy your app to a live server.

This build includes AoT
```sh
npm run build:prod
```
### Deploying to Linux
1. Install NodeJS if you haven't already.
2. Run the following command:
    ```sh
    npm install pm2 -g
    ```
3. Setup directory structure for production:
    ```sh
    mkdir %projectname%
    cd %projectname%
    mkdir prod
    ```
4. Remove source map files from files in ```dist``` directory.
5. Copy files inside ```dist``` directory to ```prod``` directory on your server.
6. To start your app for production, run the following command:
    ```sh
    NODE_ENV=production pm2 start prod/server.js
    ```

Based on https://github.com/robwormald/ng-universal-demo

