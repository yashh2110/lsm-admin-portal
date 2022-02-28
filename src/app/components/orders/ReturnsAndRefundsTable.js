import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Popover, Whisper} from 'rsuite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {Cell, Column, HeaderCell} from 'rsuite-table';
import Table from 'rsuite/Table';
import CustomAlert from '../common/CustomAlert';
import {partialRefund, refundToSource} from './OrdersServices';
import {toast} from 'react-toastify';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
const RenderMenu = React.forwardRef(
  (
    {
      onClose,
      rowdata,
      setSelectedData,
      setShowAlert,
      setOpenPartialRefund,
      setAmount,
      ...rest
    },
    ref,
  ) => {
    const handleSelect = eventKey => {
      onClose();
    };

    return (
      <Popover ref={ref} {...rest} full>
        <Dropdown.Menu onSelect={handleSelect}>
          {(rowdata.state === 'PARTIALLY_REFUNDED' ||
            rowdata.state === 'REFUNDED') &&
          rowdata.paymentMethod !== 'COD' ? (
            <Dropdown.Item
              onClick={() => {
                setSelectedData(rowdata);
                setShowAlert(true);
              }}>
              Refund to source
            </Dropdown.Item>
          ) : (
            ''
          )}
          {(rowdata.state === 'PARTIALLY_RETURNED' ||
            rowdata.state === 'RETURNED') &&
          rowdata.paymentMethod !== 'COD' ? (
            <Dropdown.Item
              onClick={() => {
                setSelectedData(rowdata);
                setAmount(rowdata.quantity * rowdata.unitPrice);
                setOpenPartialRefund(true);
              }}>
              Refund
            </Dropdown.Item>
          ) : (
            ''
          )}
        </Dropdown.Menu>
      </Popover>
    );
  },
);
function ReturnsAndRefundsTable({data, getrefunds, orderId}) {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [amount, setAmount] = useState();
  const [openPartialRefund, setOpenPartialRefund] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const popref = React.useRef();
  const refund = id => {
    refundToSource(id)
      .then(res => {
        toast.success('Refund to source was successful', {
          autoClose: 2000,
        });
        setShowAlert(false);
        getrefunds();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong!', {
          autoClose: 2000,
        });
      });
  };
  return (
    <div className="mt-0">
      <p
        style={{
          fontSize: '1.3rem',
          fontWeight: '500',
          margin: '3px',
          marginLeft: '27px',
          opacity: '0.7',
        }}>
        Returns and Refunds
      </p>
      <Table id="table" height={400} affixHeader bordered data={data}>
        <Column flexGrow={1}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>orderId</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => <p>{row.orderId}</p>}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>orderItemId</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.orderItemId ? <p>{row.orderItemId}</p> : 'N/A')}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>customerId</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (
              <Link to={`/customers/${row.customerId}`}>{row.customerId}</Link>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>orderDenyFor</HeaderCell>

          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.orderDenyFor ? <p>{row.orderDenyFor}</p> : 'N/A')}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>quantity</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.quantity ? <p>{row.quantity}</p> : 'N/A')}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Unit Price</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.unitPrice ? <p>{row.unitPrice}</p> : 'N/A')}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>amount</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.amount ? <p>{row.amount}</p> : 'N/A')}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>state</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (row.state ? <p>{row.state}</p> : 'N/A')}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>paymentMethod</HeaderCell>
          <Cell
            dataKey="paymentMethod"
            style={{fontSize: '0.8rem', margin: 0}}></Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Refunded At</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => {
              const date = new Date(row.createdAt);
              return (
                <p style={{fontSize: '0.8rem', margin: 0}}>
                  {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
                  {date.toDateString()}
                </p>
              );
            }}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Actions</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {row => (
              <Whisper
                placement="autoVerticalEnd"
                trigger="click"
                ref={popref}
                speaker={
                  <RenderMenu
                    rowdata={row}
                    setSelectedData={setSelectedData}
                    setShowAlert={setShowAlert}
                    setAmount={setAmount}
                    setOpenPartialRefund={setOpenPartialRefund}
                    onClose={() => popref.current.close()}
                  />
                }>
                <MoreHorizIcon />
              </Whisper>
            )}
          </Cell>
        </Column>
      </Table>
      {selectedData ? (
        <CustomAlert
          open={showAlert}
          handleClose={() => setShowAlert(false)}
          confirmFunction={() => refund(selectedData.id)}
          alert={`By clicking this the refund amount of ${selectedData.amount} will be initiated to source ${selectedData.customerId}!`}
        />
      ) : null}
      {selectedData ? (
        <Dialog
          open={openPartialRefund}
          onClose={() => setOpenPartialRefund(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {'Parital Refund To ' + selectedData.id}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="name"
              value={amount}
              label="Refund Amount"
              type="text"
              onChange={e => setAmount(e.target.value)}
              variant="standard"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPartialRefund(false)}>Back</Button>
            <Button
              autoFocus
              disabled={btnDisable}
              onClick={() => {
                setBtnDisable(true);
                partialRefund({
                  orderId: orderId,
                  orderItemId: selectedData.orderItemId,
                  amount: amount,
                })
                  .then(res => {
                    toast.success('Refund was successful', {
                      autoClose: true,
                    });
                    setOpenPartialRefund(false);
                    getrefunds();
                    setBtnDisable(false);
                  })
                  .catch(err => {
                    console.log(err);
                    setBtnDisable(false);
                  });
              }}>
              Refund
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}

export default ReturnsAndRefundsTable;
