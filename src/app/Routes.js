import React, {useState} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import PurchaseOrderCreateForm from './pages/PurchaseOrderCreateForm';
import Index from './pages/Index';
import Products from './pages/Products';
import PurchaseOrders from './pages/Purchaseorders';
import Vendors from './pages/Vendors';
import Warehouses from './pages/Warehouses';
import PurchaseOrderUpdateForm from './pages/PurchaseOrderUpdateForm';

import ViewPurchaseOrder from './pages/ViewPurchaseOrder';
import Assignments from './pages/Assignments';
import LsProducts from './pages/LowStockProducts';
import Banners from './pages/Banners';
import Zones from './pages/Zones';

function Routes() {
  const [activeTab, setActiveTab] = useState();
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
          path="/lowstock"
          render={props => (
            <Index activeTab={activeTab}>
              <LsProducts setActiveTab={setActiveTab} />
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

        <Route
          exact
          path="/purchaseorders/new"
          render={props => (
            <Index activeTab={activeTab}>
              <PurchaseOrderCreateForm setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/purchaseorders/update"
          render={props => (
            <Index activeTab={activeTab}>
              <PurchaseOrderUpdateForm
                setActiveTab={setActiveTab}
                item={props.location.state['item']}
              />
            </Index>
          )}
        />
        <Route
          exact
          path="/assignments"
          render={props => (
            <Index activeTab={activeTab}>
              <Assignments setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/zones"
          render={props => (
            <Index activeTab={activeTab}>
              <Zones setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/banners"
          render={props => (
            <Index activeTab={activeTab}>
              <Banners setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/purchaseorders/:orderId"
          render={props => (
            <Index activeTab={activeTab}>
              <ViewPurchaseOrder
                setActiveTab={setActiveTab}
                orderId={props.match.params.orderId}
              />
            </Index>
          )}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
