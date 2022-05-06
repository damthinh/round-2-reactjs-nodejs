import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import * as page from './pages';
import history from './history'


const token = localStorage.getItem('token')
const Routes = () =>
    (
      <div className="content">
        <Router history={history}>
          {
            localStorage.getItem('token')?
            <Redirect to={'/items'} />:
            <Redirect to={'/'} />
          }
          <Switch>
            <Route exact path="/" component={page.HomePage} />
            
            <Route exact path="/items" component={page.ItemPage} />
            {/* <Route path={'/items'}  render={() => token ? <page.ItemPage /> : <Redirect to={'/'} />} /> */}
          </Switch>
        </Router>
      </div>
    );

export default Routes;
