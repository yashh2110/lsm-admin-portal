import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  replaceSelectedOrders,
  setOrders,
  setSelectedOrders,
} from '../../../redux/actions/Assignments';
import {useDispatch, useSelector} from 'react-redux';

function SelectedOrderCard({orderId, selectedOrder}) {
  const dispatch = useDispatch();
  const {orders, selectedOrders} = useSelector(state => state.assignments);
  return (
    <span
      style={{
        padding: '5px',
        boxShadow: '0 1px 5px lightgrey',
        borderRadius: '5px',
        margin: '2px',
        whiteSpace: 'nowrap',
      }}>
      <span className="m-1 text-dark">{orderId}</span>
      <DeleteIcon
        sx={{fontSize: '20px'}}
        className="m-0 mb-2 text-danger selectOrderDelBtn"
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
