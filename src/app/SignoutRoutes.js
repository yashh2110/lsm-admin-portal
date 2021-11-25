import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Signin from './auth/Signin';

function SignoutRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" render={() => <Signin />} />
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Redirect to="/signin" />
      </Switch>
    </Router>
  );
}

export default SignoutRoutes;
