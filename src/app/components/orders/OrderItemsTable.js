import React, {useState} from 'react';
import {Dropdown, Popover, Whisper} from 'rsuite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Cell, Column, HeaderCell} from 'rsuite-table';
import Table from 'rsuite/Table';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import {toast} from 'react-toastify';
import {partialRefund} from './OrdersServices';
const RenderMenu = React.forwardRef(
  (
    {
      onClose,
      rowdata,
      setSelectedData,
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
          {rowdata.paymentMethod !== 'COD' ? (
            <Dropdown.Item
              onClick={() => {
                setSelectedData(rowdata);
                setAmount(rowdata.totalPrice);
                setOpenPartialRefund(true);
              }}>
              Partial Refund
            </Dropdown.Item>
          ) : (
            'No actions'
          )}
        </Dropdown.Menu>
      </Popover>
    );
  },
);

function OrderItemsTable({data, orderId, getrefunds}) {
  const popref = React.useRef();
  console.log(orderId);
  const [selectedData, setSelectedData] = useState();
  const [amount, setAmount] = useState();
  const [openPartialRefund, setOpenPartialRefund] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
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
        Items
      </p>
      <Table id="table" height={250} affixHeader bordered data={data}>
        <Column flexGrow={1}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Item Id</HeaderCell>
          <Cell dataKey="itemId" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Item Name</HeaderCell>
          <Cell dataKey="itemName" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Item Sub Name</HeaderCell>
          <Cell dataKey="itemSubName" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="category" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Market Price</HeaderCell>
          <Cell dataKey="marketPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Total Price</HeaderCell>
          <Cell dataKey="totalPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Unit Price</HeaderCell>
          <Cell dataKey="unitPrice" style={{fontSize: '0.8rem', margin: 0}} />
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
                  orderItemId: selectedData.id,
                  amount: amount,
                })
                  .then(res => {
                    toast.success('Partial refund was successful', {
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

export default OrderItemsTable;
