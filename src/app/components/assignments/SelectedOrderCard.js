import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {
  replaceSelectedOrders,
  setOrders,
} from '../../../redux/actions/Assignments';
function SelectedOrderCard({orderId, selectedOrder, selectedOrders}) {
  const orders = useSelector(state => state.assignments.orders);
  const dispatch = useDispatch();
  return (
    <span
      style={{
        padding: '5px',
        boxShadow: '0 1px 5px lightgrey',
        borderRadius: '5px',
        margin: '2px',
      }}>
      <span className="m-1 text-dark">{orderId}</span>
      <DeleteIcon
        sx={{fontSize: '20px'}}
        className="m-1 mb-2 text-danger selectOrderDelBtn"
        onClick={() => {
          const filteredOrders = selectedOrders.filter(i => i.id !== orderId);
          dispatch(replaceSelectedOrders(filteredOrders));
          dispatch(setOrders([...orders, selectedOrder]));
        }}
      />
    </span>
  );
}

export default SelectedOrderCard;
