import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Cell, Column, HeaderCell} from 'rsuite-table';
import Dropdown from 'rsuite/Dropdown';
import Table from 'rsuite/Table';
import {IconButton, Popover, Whisper} from 'rsuite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {canclearOrder, downloadOrderInvoice} from './OrdersServices';
import {toast} from 'react-toastify';
import RescheduleOrder from './RescheduleOrder';
import {getAllOrders} from '../../../redux/actions/Orders';
import CustomAlert from '../common/CustomAlert';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
const RenderMenu = React.forwardRef(
  (
    {
      rowData,
      onClose,
      rescheduleOpen,
      setRescheduleOpen,
      setCancleOrderPopup,
      setSelectedData,
      ...rest
    },
    ref,
  ) => {
    const handleSelect = eventKey => {
      onClose();
    };
    const history = useHistory();
    return (
      <Popover ref={ref} {...rest} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item onClick={() => downloadOrderInvoice(rowData.id)}>
            Download
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`customers/${rowData.customerId}`)}>
            Customer Orders
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(`orders/${rowData.id}`)}>
            View Order Details
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSelectedData(rowData);
              setCancleOrderPopup(true);
            }}>
            Cancel Order
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSelectedData(rowData);
              setRescheduleOpen(true);
            }}>
            Reschedule Order
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  },
);

function OrdersTable() {
  const {orders} = useSelector(state => state.orders);
  console.log(orders);
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);
  const [selectData, setSelectedData] = useState();
  const [cancleOrderPopup, setCancleOrderPopup] = useState(false);
  const {
    assignedTo,
    customerId,
    // deliveredBy,
    deliveryDate,
    deliveryState,
    orderId,
    slotId,
  } = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const cancelOrder = id => {
    canclearOrder(id)
      .then(res => {
        toast.success('Order Cancelled Succesfully', {
          autoClose: 2000,
        });
        dispatch(
          getAllOrders({
            assignedTo,
            customerId,
            deliveryDate,
            deliveryState,
            orderId,
            slotId,
          }),
        );
        setCancleOrderPopup(false);
      })
      .catch(err => {
        toast.error('Something went wrong!', {
          autoClose: 2000,
        });
        console.log(err);
      });
  };
  const popref = React.useRef();
  return (
    <div className="mt-3">
      <Table
        id="table"
        height={498}
        affixHeader
        bordered
        cellBordered
        data={orders}>
        <Column resizable width={90}>
          <HeaderCell>Id</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {rowData => <Link to={`/orders/${rowData.id}`}>{rowData.id}</Link>}
          </Cell>
        </Column>
        <Column resizable width={90}>
          <HeaderCell>Customer Id</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {rowData => (
              <Link to={`/customers/${rowData.customerId}`}>{rowData.id}</Link>
            )}
          </Cell>
        </Column>
        <Column resizable width={50}>
          <HeaderCell>Slot</HeaderCell>
          <Cell>
            {rowData => (
              <Whisper
                placement="right"
                trigger="hover"
                controlId="control-id-hover-enterable"
                speaker={
                  <Popover title="Delivery Slot">
                    <p style={{maxWidth: '250px'}}>
                      {rowData.deliverySlot.description}
                    </p>
                  </Popover>
                }
                enterable>
                <a style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
                  {rowData.deliverySlot.id}
                </a>
              </Whisper>
            )}
          </Cell>
        </Column>

        <Column resizable>
          <HeaderCell>Payment Method</HeaderCell>
          <Cell
            dataKey="paymentMethod"
            style={{fontSize: '0.8rem', margin: 0}}
          />
        </Column>
        <Column resizable width={90}>
          <HeaderCell>Billing Address</HeaderCell>
          <Cell>
            {rowData => (
              <Whisper
                placement="right"
                trigger="hover"
                controlId="control-id-hover-enterable"
                speaker={
                  <Popover title={rowData.billingAddress.recipientName}>
                    <p style={{maxWidth: '300px'}}>
                      {rowData.billingAddress.addressLine_1}
                    </p>
                    <p>{rowData.billingAddress.pinCode}</p>
                    <p>
                      <a
                        href={`tel:${rowData.billingAddress.recipientMobileNumber}`}>
                        {rowData.billingAddress.recipientMobileNumber}
                      </a>
                    </p>
                  </Popover>
                }
                enterable>
                <a style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
                  {rowData.billingAddress.id}
                </a>
              </Whisper>
            )}
          </Cell>
        </Column>
        <Column resizable>
          <HeaderCell>Assigned To</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {rowData => (
              <p>{rowData.assignedTo ? rowData.assignedTo.name : 'N/A'}</p>
            )}
          </Cell>
        </Column>
        <Column resizable>
          <HeaderCell>Delivered By</HeaderCell>
          <Cell style={{fontSize: '0.8rem', margin: 0}}>
            {rowData => (
              <p>{rowData.deliveredBy ? rowData.deliveredBy.name : 'N/A'}</p>
            )}
          </Cell>
        </Column>
        <Column resizable width={120}>
          <HeaderCell>Delivered At</HeaderCell>
          <Cell>
            {row => {
              let date;
              if (row.deliveredAt) {
                date = new Date(row.deliveredAt);
              }
              return (
                <p style={{fontSize: '0.8rem', margin: 0}}>
                  {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
                  {row.deliveredAt ? date.toDateString() : 'N/A'}
                </p>
              );
            }}
          </Cell>
        </Column>
        <Column resizable>
          <HeaderCell>Delivered state</HeaderCell>
          <Cell dataKey="state" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column resizable width={120}>
          <HeaderCell>Ordered At</HeaderCell>
          <Cell>
            {row => {
              const date = new Date(row.orderedAt);
              return (
                <p style={{fontSize: '0.8rem', margin: 0}}>
                  {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
                  {date.toDateString()}
                </p>
              );
            }}
          </Cell>
        </Column>
        <Column resizable>
          <HeaderCell>Offer Price</HeaderCell>
          <Cell dataKey="offerPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column resizable>
          <HeaderCell>finalPrice</HeaderCell>
          <Cell dataKey="finalPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column resizable>
          <HeaderCell>Refunded Amount</HeaderCell>
          <Cell
            dataKey="refundedAmount"
            style={{fontSize: '0.8rem', margin: 0}}
          />
        </Column>
        <Column resizable>
          <HeaderCell>Credit Used</HeaderCell>
          <Cell dataKey="creditUsed" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column resizable>
          <HeaderCell>Offer Code</HeaderCell>
          <Cell dataKey="offerCode" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column width={70} fixed="right">
          <HeaderCell>Action</HeaderCell>

          <Cell>
            {rowData => {
              return (
                <Whisper
                  placement="autoVerticalEnd"
                  trigger="click"
                  ref={popref}
                  speaker={
                    <RenderMenu
                      rowData={rowData}
                      setRescheduleOpen={setRescheduleOpen}
                      rescheduleOpen={rescheduleOpen}
                      setSelectedData={setSelectedData}
                      setCancleOrderPopup={setCancleOrderPopup}
                      onClose={() => popref.current.close()}
                    />
                  }>
                  <MoreHorizIcon />
                </Whisper>
              );
            }}
          </Cell>
        </Column>
      </Table>
      {selectData ? (
        <RescheduleOrder
          open={rescheduleOpen}
          rowData={selectData}
          handleClose={() => setRescheduleOpen(false)}
        />
      ) : null}
      {selectData ? (
        <CustomAlert
          open={cancleOrderPopup}
          handleClose={() => setCancleOrderPopup(false)}
          confirmFunction={() => cancelOrder(selectData.id)}
          alert="Are you sure you want to cancle the order ?"
          alertDesc="By clicking this you will cancel the order!"
        />
      ) : null}
    </div>
  );
}

export default OrdersTable;
