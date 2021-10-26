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
function ViewCustomers({id, setActiveTab}) {
  const [transactions, setTransactions] = useState();
  const [blockOpen, setBlockOpen] = useState(false);
  const [addCreditOpen, setAddCreditOpen] = useState(false);
  const [customer, setCustomer] = useState();
  const history = useHistory();
  // if (!customer) {
  //   history.push('/customers');
  // }
  const getCustomer = () => {
    getCustomerById(id)
      .then(res => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleBlockClose = () => {
    setBlockOpen(false);
  };
  const handleAddCreditClose = () => {
    setAddCreditOpen(false);
  };
  useEffect(() => {
    getCustomer();
    getTransactionService({id})
      .then(res => {
        console.log(res.data);
        setTransactions(res.data.creditTransactions);
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
              <b>Available Credits</b>: {customer.creditBalance}
            </p>
          </div>
        </div>
        {transactions ? (
          <CustomerTransactionTable data={transactions} />
        ) : (
          <p className="text-center">No Transactions</p>
        )}
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
