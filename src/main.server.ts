import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from './modules/ng-express-engine/express-engine';
import { ROUTES } from './routes';
import { App } from './api/app';
import { enableProdMode } from '@angular/core';
import { EnvironmentManager } from './confighelpers';
enableProdMode();

const environmentManager = new EnvironmentManager(process.env.NODE_ENV);

const path = require('path');
const app = express();
const api = new App();
const port = environmentManager.getPort();
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', environmentManager.getViewsPath());

app.use(express.static(environmentManager.getStaticPath(), { index: false }));

ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render(environmentManager.getIndexPath(), {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/users', (req, res) => {

  let users = api.getUsers();
  let userList = [];

  users.forEach( user => {
    userList.push({
      name: user.name,
      index: user.index,
      isActive: user.isActive,
      balance: user.balance,
      gender: user.gender
    })
  });
  res.json(userList);
});

app.get('/users/:user_id', (req, res) => {
  let users = api.getUsers();
  let requestedUser = users.filter(user => user.index == req.params.user_id)[0];
  if( requestedUser ){
    res.json(requestedUser)
  } else {
    res.status(400).send('No user matching search criteria');
  }
});

app.listen(port, "0.0.0.0", () => {
	console.log(`Listening at ${baseUrl}`);
});
