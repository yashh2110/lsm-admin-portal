import {combineReducers} from 'redux';
import AssignemenReducer from './Assignments';
import BannerReducer from './Banners';
import CodReducer from './CodSummary';
import CustomersReducer from './Customers';
import EstimationReducer from './Estimation';
import InvoiceReducer from './Invoices';
import LoaderReducer from './Loader';
import PartnerReducer from './Partners';
import ProductReducer from './Products';
import PurchaseReduser from './PurchaseOrder';
import ReturnsAndRefundsReducer from './ReturnsAndRefunds';

import VendorReducer from './Vendors';
import WarehouseReduser from './Warehouses';
import ZoneReducer from './Zones';
import UserReducer from './User';
import OrdersReducer from './Orders';

const allReducer = combineReducers({
  user: UserReducer,
  orders: OrdersReducer,
  vendors: VendorReducer,
  warehouses: WarehouseReduser,
  purchaseorders: PurchaseReduser,
  invoices: InvoiceReducer,
  products: ProductReducer,
  assignments: AssignemenReducer,
  banners: BannerReducer,
  customers: CustomersReducer,
  zones: ZoneReducer,
  codsummary: CodReducer,
  partners: PartnerReducer,
  returnsandrefunds: ReturnsAndRefundsReducer,
  estimations: EstimationReducer,
  loader: LoaderReducer,
});

export default allReducer;
