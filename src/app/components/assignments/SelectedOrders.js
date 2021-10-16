import React from 'react';
import SelectedOrderCard from './SelectedOrderCard';

function SelectedOrders({
  selectedOrders,
  setSelectedOrders,
  orders,
  setOrders,
}) {
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
                orders={orders}
                setOrders={setOrders}
                selectedOrder={i}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                key={i.id}
              />
            ))
          : 'Please click on marker in map to select order'}
      </p>
    </div>
  );
}

export default React.memo(SelectedOrders);
