import React from 'react';
import {useSelector} from 'react-redux';

import MarkerAndInfo from './MarkerAndInfo';

function Markers() {
  const {orders} = useSelector(state => state.assignments);
  return orders
    ? orders.map(i =>
        i.associatedAddress ? <MarkerAndInfo i={i} key={i.id} /> : null,
      )
    : null;
}

export default React.memo(Markers);
