import axios from 'axios';
import {batch} from 'react-redux';
import {ActionTypes} from '../actionTypes/ActionTypes';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/assignment/';
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
export const setAssignemtDate = payload => {
  return {
    type: ActionTypes.SET_ASSIGNMENT_DATE,
    payload,
  };
};
export const setAssignmentSlot = payload => {
  return {
    type: ActionTypes.SET_ASSINGMENT_SLOT,
    payload,
  };
};
export const setAllSlots = payload => {
  return {
    type: ActionTypes.SET_ALL_SLOTS,
    payload,
  };
};
export const setSlotStr = payload => {
  return {
    type: ActionTypes.SET_ASSIGNMENT_SLOT_STR,
    payload,
  };
};
export const getActiveDes = () => {
  return async dispatch => {
    await axios
      .get(URL_BASE + 'delivery-executives')
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
      .get(URL_BASE + 'zones')
      .then(res => {
        dispatch(setZones(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const setIsFetching = payload => {
  return {
    type: ActionTypes.IS_FETCHING_ASSIGNMENT,
    payload,
  };
};
export const getOrders = (date, slot) => {
  return async dispatch => {
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      try {
        const res = await axios.get(
          URL_BASE +
            `orders?start-time=${start.getTime()}&end-time=${end.getTime()}&slot-id-list=${slot}`,
        );
        dispatch(setOrders(res.data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const getAssignedOrders = (date, slot) => {
  return async dispatch => {
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      try {
        const res = await axios.get(
          URL_BASE +
            `delivery-executives/orders?start_time=${start.getTime()}&end_time=${end.getTime()}&slot-id-list=${slot}`,
        );
        const data = Object.keys(res.data).map(i => {
          const item = {
            id: i.split(':')[0],
            de: i.split(':')[1],
            orders: res.data[i],
          };
          return item;
        });
        dispatch(setAssignedOrders(data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const getOrderStateSummary = date => {
  return async dispatch => {
    if (date) {
      const newDate = new Date(date);
      const formattedDate =
        newDate.getMonth() +
        1 +
        '/' +
        newDate.getDate() +
        '/' +
        newDate.getFullYear();
      try {
        const res = await axios.get(
          URL_BASE + `orders/summary?orderDate=${formattedDate}`,
        );

        dispatch(setOrderStateSummary(res.data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const assignementsApis = (date, slot) => {
  return async dispatch => {
    dispatch(setIsFetching(true));

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      const newDate = new Date(date);
      const formattedDate =
        newDate.getMonth() +
        1 +
        '/' +
        newDate.getDate() +
        '/' +
        newDate.getFullYear();
      const orders =
        URL_BASE +
        `orders?start-time=${start.getTime()}&end-time=${end.getTime()}&slot-id-list=${slot}`;
      const assignedOrders =
        URL_BASE +
        `delivery-executives/orders?start_time=${start.getTime()}&end_time=${end.getTime()}&slot-id-list=${slot}`;
      const orderState = URL_BASE + `orders/summary?orderDate=${formattedDate}`;

      const getOrders = await axios.get(orders);
      const getAssignedOrders = await axios.get(assignedOrders);
      const getOrderState = await axios.get(orderState);
      axios
        .all([getOrders, getAssignedOrders, getOrderState])
        .then(
          axios.spread((...alldata) => {
            const assigndata = Object.keys(alldata[1].data).map(i => {
              const item = {
                id: i.split(':')[0],
                de: i.split(':')[1],
                orders: alldata[1].data[i],
              };
              return item;
            });
            batch(() => {
              dispatch(setOrders(alldata[0].data));
              dispatch(setAssignedOrders(assigndata));
              dispatch(setOrderStateSummary(alldata[2].data));
              dispatch(setIsFetching(false));
            });
          }),
        )
        .catch(err => {
          console.log(err);
          dispatch(setIsFetching(false));
        });
    }
  };
};
