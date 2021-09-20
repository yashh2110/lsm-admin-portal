import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Index from './pages/Index';
import Products from './pages/Products';
import PurchaseOrders from './pages/Purchaseorders';
import Vendors from './pages/Vendors';
import Warehouses from './pages/Warehouses';

function Routes() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Index activeTab={activeTab}>
              <Products setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/vendors"
          render={props => (
            <Index activeTab={activeTab}>
              <Vendors setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/warehouses"
          render={props => (
            <Index activeTab={activeTab}>
              <Warehouses setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/purchaseorders"
          render={props => (
            <Index activeTab={activeTab}>
              <PurchaseOrders setActiveTab={setActiveTab} />
            </Index>
          )}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
