import React from 'react';
import { Route, Switch, Router , Redirect } from 'react-router-dom';
import * as page from './pages';
import history from './history'

const Routes = () => (
  <div className="content">
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={page.HomePage} />
        {/* <Route exact path="/items" component={page.ItemPage} /> */}
        <Route exact path="/items" render={()=>localStorage.getItem('token')? <page.ItemPage/>:<Redirect to={'/'} />} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
