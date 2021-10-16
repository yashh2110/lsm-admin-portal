import React from 'react';

import MarkerAndInfo from './MarkerAndInfo';

function Markers({setSelectedOrders, selectedOrders, orders, setOrders}) {
  return orders
    ? orders.map(i =>
        i.associatedAddress ? (
          <MarkerAndInfo
            i={i}
            orders={orders}
            setOrders={setOrders}
            key={i.id}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
          />
        ) : null,
      )
    : null;
}

export default React.memo(Markers);
