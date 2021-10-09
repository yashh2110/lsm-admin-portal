import {combineReducers} from 'redux';
import AssignemenReducer from './Assignments';
import BannerReducer from './Banners';
import ProductReducer from './Products';
import PurchaseReduser from './PurchaseOrder';

import VendorReducer from './Vendors';
import WarehouseReduser from './Warehouses';

const allReducer = combineReducers({
  vendors: VendorReducer,
  warehouses: WarehouseReduser,
  purchaseorders: PurchaseReduser,
  products: ProductReducer,
  assignments: AssignemenReducer,
  banners: BannerReducer,
});

export default allReducer;
