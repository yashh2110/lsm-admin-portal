import {combineReducers} from 'redux';
import AdminReducer from './Admin';
import AssignemenReducer from './Assignments';
import ProductReducer from './Products';
import PurchaseReduser from './PurchaseOrder';

import VendorReducer from './Vendors';
import WarehouseReduser from './Warehouses';

const allReducer = combineReducers({
  admin: AdminReducer,
  vendors: VendorReducer,
  warehouses: WarehouseReduser,
  purchaseorders: PurchaseReduser,
  products: ProductReducer,
  assignments: AssignemenReducer,
});

export default allReducer;
