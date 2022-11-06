import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import * as page from './pages';
import history from './history'

const Routes = () => (
  <div className="content">
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={page.HomePage} />
        <Route exact path="/items" component={page.ItemPage} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
