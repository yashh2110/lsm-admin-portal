import React from 'react';
import {useSelector} from 'react-redux';
import SelectedOrderCard from './SelectedOrderCard';

function SelectedOrders({}) {
  const {selectedOrders} = useSelector(state => state.assignments);
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 100,
      }}>
      <p className="selectedOrderLabel">Selected Order Ids:</p>
      <p className="selectedOrder">
        {selectedOrders
          ? selectedOrders.map(i => (
              <SelectedOrderCard
                orderId={i.id}
                selectedOrder={i}
                selectedOrders={selectedOrders}
                key={i.id}
              />
            ))
          : 'Please click on marker in map to select order'}
      </p>
    </div>
  );
}

export default React.memo(SelectedOrders);
