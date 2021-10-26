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
import Customers from './pages/Customers';
import ViewCustomers from './pages/ViewCustomers';
import CreateZones from './pages/CreateZones';
import ViewZone from './pages/ViewZone';

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
          path="/zones/create"
          render={props => (
            <Index activeTab={activeTab}>
              <CreateZones setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/zones/:zoneId"
          render={props => (
            <Index activeTab={activeTab}>
              <ViewZone
                setActiveTab={setActiveTab}
                zoneId={props.match.params.zoneId}
                zone={
                  props.location.state.zone ? props.location.state.zone : {}
                }
              />
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
          path="/customers"
          render={props => (
            <Index activeTab={activeTab}>
              <Customers setActiveTab={setActiveTab} />
            </Index>
          )}
        />
        <Route
          exact
          path="/customers/:customerId"
          render={props => (
            <Index activeTab={activeTab}>
              <ViewCustomers
                setActiveTab={setActiveTab}
                id={props.match.params.customerId}
                customer={
                  props.location.state?.customer
                    ? props.location.state.customer
                    : ''
                }
              />
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
