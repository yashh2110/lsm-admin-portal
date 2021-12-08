import React, {useState} from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
import PurchaseOrderDuplicateForm from './pages/PurchaseOrderDuplicateForm';
import CodSummary from './pages/CodSummary';
import Partners from './pages/Partners';
import ReturnsAndRefunds from './pages/ReturnsAndRefunds';
import Estimations from './pages/Estimation';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Loader from './components/common/Loader';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

function Routes() {
  const [activeTab, setActiveTab] = useState();
  const {sessionId, id} = useSelector(state => state.user);
  const loader = useSelector(state => state.loader);
  if (sessionId && id) {
    axios.interceptors.request.use(req => {
      req.headers['session-id'] = sessionId;
      req.headers['inventory-user-id'] = id;
      return req;
    });
  }

  return (
    <>
      {sessionId && id ? (
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
              path="/codsummary"
              render={props => (
                <Index activeTab={activeTab}>
                  <CodSummary setActiveTab={setActiveTab} />
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
              path="/purchaseorders/update/:id"
              render={props => (
                <Index activeTab={activeTab}>
                  <PurchaseOrderUpdateForm
                    setActiveTab={setActiveTab}
                    id={props.match.params.id}
                  />
                </Index>
              )}
            />
            <Route
              exact
              path="/purchaseorders/duplicate/:id"
              render={props => (
                <Index activeTab={activeTab}>
                  <PurchaseOrderDuplicateForm
                    setActiveTab={setActiveTab}
                    id={props.match.params.id}
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
              path="/partners"
              render={props => (
                <Index activeTab={activeTab}>
                  <Partners setActiveTab={setActiveTab} />
                </Index>
              )}
            />
            <Route
              exact
              path="/returnsandrefunds"
              render={props => (
                <Index activeTab={activeTab}>
                  <ReturnsAndRefunds setActiveTab={setActiveTab} />
                </Index>
              )}
            />
            <Route
              exact
              path="/estimations"
              render={props => (
                <Index activeTab={activeTab}>
                  <Estimations setActiveTab={setActiveTab} />
                </Index>
              )}
            />
            <Route
              exact
              path="/orders"
              render={props => (
                <Index activeTab={activeTab}>
                  <Orders setActiveTab={setActiveTab} />
                </Index>
              )}
            />
            <Route
              exact
              path="/orders/:id"
              render={props => (
                <Index activeTab={activeTab}>
                  <OrderDetails
                    setActiveTab={setActiveTab}
                    orderId={props.match.params.id}
                  />
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
            <Route exact path="/signin">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      ) : null}
      {loader ? <Loader /> : null}
    </>
  );
}

export default Routes;
