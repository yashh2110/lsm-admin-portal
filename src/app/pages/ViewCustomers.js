import React, {useEffect, useState} from 'react';
import '../css/pages/vendor.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router';
import Button from '@material-ui/core/Button';
import {
  getCustomerById,
  getTransactionService,
} from '../components/customers/CustomerService';
import CustomerTransactionTable from '../components/customers/CustomerTransactionTable';
import CustomerBlockStatus from '../components/customers/CustomerBlockStatus';
import AddCredits from '../components/customers/AddCredits';
import CustomerCodStatus from '../components/customers/CustomerCodStatus';
import {getOrdersByCustomer} from '../components/orders/OrdersServices';
import CustomerOrdersTable from '../components/customers/CustomersOrdersTable';
function ViewCustomers({id, setActiveTab}) {
  const [transactions, setTransactions] = useState();
  const [orders, setOrders] = useState();
  const [blockOpen, setBlockOpen] = useState(false);
  const [codOpen, setCodOpen] = useState(false);
  const [addCreditOpen, setAddCreditOpen] = useState(false);
  const [customer, setCustomer] = useState();
  const [toggleTable, setToggleTable] = useState('orders');
  const history = useHistory();
  // if (!customer) {
  //   history.push('/customers');
  // }
  const getCustomer = () => {
    getCustomerById(id)
      .then(res => {
        setCustomer(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleBlockClose = () => {
    setBlockOpen(false);
  };
  const handleCodClose = () => {
    setCodOpen(false);
  };
  const handleAddCreditClose = () => {
    setAddCreditOpen(false);
  };
  useEffect(() => {
    getCustomer();
    getTransactionService({id})
      .then(res => {
        setTransactions(res.data.creditTransactions);
      })
      .catch(err => console.log(err));
    getOrdersByCustomer(id)
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.log(err));
    setActiveTab(7);
  }, []);
  return customer ? (
    <>
      <div className="vendor">
        <div className="pocreateHead">
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="pocBack"
              onClick={() => {
                history.goBack();
              }}>
              <ArrowBackOutlinedIcon sx={{fontSize: '24px'}} />
            </div>
            <p className="pocTitle">{customer.name}s' Details</p>
          </div>
          <div className="m-4 mt-0 mb-0">
            <Button
              variant="contained"
              onClick={() => setCodOpen(true)}
              style={{
                backgroundColor: ' rgb(223, 223, 223)',
                boxShadow: 'none',
                color: '#333',
                textTransform: 'capitalize',
                marginLeft: '20px',
              }}>
              COD Status
            </Button>
            <Button
              variant="contained"
              onClick={() => setBlockOpen(true)}
              style={{
                backgroundColor: ' rgb(223, 223, 223)',
                boxShadow: 'none',
                color: '#333',
                textTransform: 'capitalize',
                marginLeft: '20px',
              }}>
              Block User
            </Button>
            <Button
              variant="contained"
              onClick={() => setAddCreditOpen(true)}
              style={{
                backgroundColor: ' rgb(223, 223, 223)',
                boxShadow: 'none',
                color: '#333',
                textTransform: 'capitalize',
                marginLeft: '20px',
              }}>
              Add Credits
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-evenly flex-column m-5 mt-2 mb-0">
          <div>
            <p>
              <b>Mobile Number</b>: {customer.userMobileNumber}
            </p>
          </div>
          <div>
            <p>
              <b>Email</b>: {customer.userEmail}
            </p>
          </div>
          <div>
            <p>
              <b>Block Status</b>:{' '}
              {customer.isBlocked ? 'Blocked' : 'Not Blocked'}
            </p>
          </div>
          <div>
            <p>
              <b>COD</b>: {customer.codStatus ? 'Disabled' : 'Enabled'}
            </p>
          </div>
          <div>
            <p>
              <b>Available Credits</b>: {customer.creditBalance}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start">
          <p
            style={{
              fontSize: '1.2rem',
              padding: '10px',
              margin: '10px',
              fontWeight: '600',
              cursor: 'pointer',

              opacity: toggleTable === 'orders' ? 1 : 0.5,
            }}
            onClick={() => setToggleTable('orders')}>
            Orders
          </p>
          <p
            style={{
              fontSize: '1.2rem',
              padding: '10px',
              margin: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: toggleTable === 'transactions' ? 1 : 0.5,
            }}
            onClick={() => setToggleTable('transactions')}>
            Transactions
          </p>
        </div>
        {toggleTable === 'transactions' ? (
          transactions ? (
            <CustomerTransactionTable data={transactions} />
          ) : (
            <p className="text-center">No Transactions</p>
          )
        ) : null}
        {toggleTable === 'orders' ? (
          orders ? (
            <CustomerOrdersTable data={orders} />
          ) : (
            <p className="text-center">No Orders</p>
          )
        ) : null}
        {codOpen ? (
          <CustomerCodStatus
            open={codOpen}
            handleClose={handleCodClose}
            getCustomer={getCustomer}
            id={id}
          />
        ) : null}
        {blockOpen ? (
          <CustomerBlockStatus
            open={blockOpen}
            handleClose={handleBlockClose}
            getCustomer={getCustomer}
            id={id}
          />
        ) : null}
        {addCreditOpen ? (
          <AddCredits
            open={addCreditOpen}
            handleClose={handleAddCreditClose}
            getCustomer={getCustomer}
            id={id}
          />
        ) : null}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default ViewCustomers;
