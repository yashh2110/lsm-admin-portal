import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from 'rsuite/Dropdown';
import {Popover, Whisper} from 'rsuite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  canclearOrder,
  downloadOrderInvoice,
  markAsDeliveredService,
} from './OrdersServices';
import {toast} from 'react-toastify';
import RescheduleOrder from './RescheduleOrder';
import {getAllOrders, getOrdersByPage} from '../../../redux/actions/Orders';
import CustomAlert from '../common/CustomAlert';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import MaterialTable from 'material-table';
import {Icon} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RearrangeCl from './RearrangeCl';
const RenderMenu = React.forwardRef(
  (
    {
      rowData,
      onClose,
      rescheduleOpen,
      setRescheduleOpen,
      setCancleOrderPopup,
      setOpenMarkAsDelivered,
      setSelectedData,
      setOpenRearrangeCl,
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
          {rowData.state === 'ASSIGNED' || rowData.state === 'IN_TRANSIT' ? (
            <>
              <Dropdown.Item
                onClick={() => {
                  setSelectedData(rowData);
                  setOpenMarkAsDelivered(true);
                }}>
                Mark As Delivered
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSelectedData(rowData);
                  setOpenRearrangeCl(true);
                }}>
                Rearrange CL
              </Dropdown.Item>
            </>
          ) : null}
        </Dropdown.Menu>
      </Popover>
    );
  },
);

function OrdersTable({slotIdParam, deliveryDateParam, deliveryStateparam}) {
  const {orders} = useSelector(state => state.orders);
  console.log(orders);
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);
  const [selectData, setSelectedData] = useState();
  const [cancleOrderPopup, setCancleOrderPopup] = useState(false);
  const [openMarkAsDelivered, setOpenMarkAsDelivered] = useState(false);
  const [openRearrangeCl, setOpenRearrangeCl] = useState(false);
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
  const [page, setPage] = useState(0);
  const column = [
    {
      title: 'Order Id',

      render: rowData => {
        return (
          <>
            <Waypoint
              onEnter={() => {
                if (rowData.tableData.id === orders.length - 2) {
                  dispatch(
                    getOrdersByPage({
                      assignedTo,
                      customerId,
                      // deliveredBy,
                      deliveryDate: deliveryDateParam || deliveryDate,
                      deliveryState: deliveryStateparam || deliveryState,
                      orderId,
                      slotId: slotIdParam || slotId,
                      page: page + 1,
                    }),
                  );
                  setPage(i => i + 1);
                }
              }}></Waypoint>
            <Link to={`/orders/${rowData.id}`} style={{color: 'blue'}}>
              {rowData.id}
            </Link>
          </>
        );
      },
    },
    {
      title: 'Customer Id',
      render: rowData => (
        <Link to={`/customers/${rowData.customerId}`} style={{color: 'blue'}}>
          {rowData.customerId}
        </Link>
      ),
    },
    {
      title: 'Slot',
      field: 'orderId',
      render: rowData => (
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
          <span
            style={{
              fontSize: '0.8rem',
              margin: 0,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
            }}>
            {rowData.deliverySlot.id}
            <InfoOutlinedIcon
              style={{
                marginLeft: 3,
                fontSize: 20,
                paddingBottom: 2,
                color: 'grey',
              }}
            />
          </span>
        </Whisper>
      ),
    },
    {title: 'Payment Method', field: 'paymentMethod'},
    {
      title: 'Billing Address',
      render: rowData => (
        <Whisper
          placement="right"
          trigger="hover"
          controlId="control-id-hover-enterable"
          speaker={
            <Popover title={rowData.billingAddress.recipientName}>
              <p style={{maxWidth: '280px'}}>
                {rowData.billingAddress.addressLine_1}
              </p>
              <p>{rowData.billingAddress.pinCode}</p>
              <p>
                <a href={`tel:${rowData.billingAddress.recipientMobileNumber}`}>
                  {rowData.billingAddress.recipientMobileNumber}
                </a>
              </p>
            </Popover>
          }
          enterable>
          <span style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
            {rowData.billingAddress.id}
            <InfoOutlinedIcon
              style={{
                marginLeft: 3,
                fontSize: 20,
                paddingBottom: 2,
                color: 'grey',
              }}
            />
          </span>
        </Whisper>
      ),
    },
    {
      title: 'Assigned To',
      render: rowData =>
        rowData.assignedTo ? (
          <Whisper
            placement="right"
            trigger="hover"
            controlId="control-id-hover-enterable"
            speaker={
              <Popover title="Assigned By">
                <p>{rowData.assignedTo?.name}</p>
                {/* <p>{rowData.assignedTo.pinCode}</p> */}
                <p>
                  <a href={`tel:${rowData.assignedTo?.phoneNumber}`}>
                    {rowData.assignedTo?.phoneNumber}
                  </a>
                </p>
              </Popover>
            }
            enterable>
            <span style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
              {rowData.assignedTo?.id}
              <InfoOutlinedIcon
                style={{
                  marginLeft: 3,
                  fontSize: 20,
                  paddingBottom: 2,
                  color: 'grey',
                }}
              />
            </span>
          </Whisper>
        ) : (
          'N/A'
        ),
    },

    {
      title: 'Delivery Date',
      render: row => {
        let date;
        if (row.deliveryDate) {
          date = new Date(row.deliveryDate);
        }
        return (
          <p style={{fontSize: '0.8rem', margin: 0, width: 70}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {row.deliveryDate ? date.toDateString() : 'N/A'}
          </p>
        );
      },
    },
    {
      title: 'Delivered By',
      render: rowData =>
        rowData.deliveredBy ? (
          <Whisper
            placement="right"
            trigger="hover"
            controlId="control-id-hover-enterable"
            speaker={
              <Popover title="Assigned By">
                <p>{rowData.deliveredBy?.name}</p>
                {/* <p>{rowData.deliveredBy.pinCode}</p> */}
                <p>
                  <a href={`tel:${rowData.deliveredBy?.phoneNumber}`}>
                    {rowData.deliveredBy?.phoneNumber}
                  </a>
                </p>
              </Popover>
            }
            enterable>
            <span style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
              {rowData.deliveredBy?.id}
              <InfoOutlinedIcon
                style={{
                  marginLeft: 3,
                  fontSize: 20,
                  paddingBottom: 2,
                  color: 'grey',
                }}
              />
            </span>
          </Whisper>
        ) : (
          'N/A'
        ),
    },
    {
      title: 'Delivery Fee',
      render: rowData => <p>{rowData.deliveryFee}</p>,
    },
    {
      title: 'Delivered At',
      render: row => {
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
      },
    },
    {title: 'Delivered state', field: 'state'},
    {
      title: 'Ordered At',
      render: row => {
        const date = new Date(row.orderedAt);
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {date.toDateString()}
          </p>
        );
      },
    },
    {title: 'Offer Price', field: 'offerPrice'},
    {title: 'Final Price', field: 'finalPrice'},
    {title: 'Refunded Amount', field: 'refundedAmount'},
    {title: 'Wallet', field: 'creditUsed'},
    {title: 'Offer Code', field: 'offerCode'},
    {
      title: 'Actions',
      cellStyle: {
        backgroundColor: '#FFF',
        position: 'sticky',
        right: 0,
      },
      headerStyle: {
        backgroundColor: '#FFF',
        position: 'sticky',
        right: 0,
        zIndex: 11,
      },
      render: rowData => {
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
                setOpenRearrangeCl={setOpenRearrangeCl}
                setOpenMarkAsDelivered={setOpenMarkAsDelivered}
                onClose={() => popref.current.close()}
              />
            }>
            <MoreHorizIcon />
          </Whisper>
        );
      },
    },
  ];
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
  const markAsDelivered = (id, setIsDisabled) => {
    setIsDisabled(true);
    markAsDeliveredService(id)
      .then(res => {
        toast.success(res.data, {
          autoClose: 3000,
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
        setOpenMarkAsDelivered(false);
        setIsDisabled(false);
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong!', {
          autoClose: 3000,
        });
        setIsDisabled(false);
      });
  };
  const popref = React.useRef();
  return (
    <div className="mt-3">
      <MaterialTable
        style={{padding: '0 0px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',

          actionsColumnIndex: -1,
          search: false,
          toolbar: false,
          sorting: false,
          headerStyle: {
            fontSize: '13px',
            fontWeight: '500',
          },
          minBodyHeight: '490px',
          maxBodyHeight: '499px',
          rowStyle: {
            fontSize: '13px',
          },

          draggable: false,
        }}
        columns={column}
        data={orders}
        title="Orders"
      />

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
      {selectData ? (
        <CustomAlert
          open={openMarkAsDelivered}
          handleClose={() => setOpenMarkAsDelivered(false)}
          confirmFunction={setIsDisabled =>
            markAsDelivered(selectData.id, setIsDisabled)
          }
          alert={`Marking Order ${selectData.id} as delivered`}
          alertDesc="By clicking this you will mark this order as delivered!"
        />
      ) : null}
      {selectData ? (
        <RearrangeCl
          open={openRearrangeCl}
          handleClose={() => setOpenRearrangeCl(false)}
          id={selectData.id}
        />
      ) : null}
    </div>
  );
}

export default OrdersTable;
