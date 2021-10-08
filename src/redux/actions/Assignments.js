import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';

export const setActiveDes = payload => {
  return {
    type: ActionTypes.GET_ACTIVE_DE,
    payload,
  };
};
export const setZones = payload => {
  return {
    type: ActionTypes.GET_ZONES,
    payload,
  };
};
export const setOrders = payload => {
  return {
    type: ActionTypes.GET_ORDERS,
    payload,
  };
};
export const setAssignedOrders = payload => {
  return {
    type: ActionTypes.GET_ASSIGNED_ORDERS,
    payload,
  };
};
export const setOrderStateSummary = payload => {
  return {
    type: ActionTypes.GET_ORDER_STATE_SUMMARY,
    payload,
  };
};
export const setSelectedOrders = payload => {
  return {
    type: ActionTypes.SET_SELECTED_ORDERS,
    payload,
  };
};
export const replaceSelectedOrders = payload => {
  return {
    type: ActionTypes.REPLACE_SELECTED_ORDERS,
    payload,
  };
};

export const getActiveDes = () => {
  return async dispatch => {
    await axios
      .get(
        'https://test-api.zasket.in/inventory/api/1/assignment/delivery-executives',
      )
      .then(res => {
        dispatch(setActiveDes(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getZones = () => {
  return async dispatch => {
    await axios
      .get('https://test-api.zasket.in/inventory/api/1/assignment/zones')
      .then(res => {
        dispatch(setZones(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getOrders = (date, slot) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // const params = {
  //   deliveryStateList: ['IN_INVENTORY'],
  //   slotIdList: [1, 2, 3, 4],
  //   endTime: end.getTime(),
  //   startTime: start.getTime(),
  // };
  return async dispatch => {
    if (date) {
      await axios
        .get(
          `https://test-api.zasket.in/inventory/api/1/assignment/orders?start-time=${start.getTime()}&end-time=${end.getTime()}&slot-id-list=${slot}`,
        )
        .then(res => {
          dispatch(setOrders(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const getAssignedOrders = (date, slot) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return async dispatch => {
    if (date) {
      await axios
        .get(
          `https://test-api.zasket.in/inventory/api/1/assignment/delivery-executives/orders?start_time=${start.getTime()}&end_time=${end.getTime()}&slot-id-list=${slot}`,
        )
        .then(res => {
          const data = Object.keys(res.data).map(i => {
            const item = {
              id: i.split(':')[0],
              de: i.split(':')[1],
              orders: res.data[i],
            };

            return item;
          });
          return data;
        })
        .then(res => {
          dispatch(setAssignedOrders(res));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const getOrderStateSummary = date => {
  const splitDate = date.split('-');
  const formattedDate = splitDate[1] + '/' + splitDate[2] + '/' + splitDate[0];
  return async dispatch => {
    if (date) {
      await axios
        .get(
          `https://test-api.zasket.in/inventory/api/1/assignment/orders/summary?orderDate=${formattedDate}`,
        )
        .then(res => {
          dispatch(setOrderStateSummary(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};
