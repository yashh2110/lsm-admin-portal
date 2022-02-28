import axios from 'axios';
import React, {useState} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {
  replaceSelectedOrders,
  setAssignedOrders,
  setOrders,
  setOrderStateSummary,
} from '../../../redux/actions/Assignments';
import ActiveDeCard from './ActiveDeCard';
import {assignOrderService, getAllService} from './AssignmentService';

function ActiveDes() {
  const activeDes = useSelector(state => state.assignments.activeDes);
  const {selectedOrders} = useSelector(state => state.assignments);
  const {date, slotstr, ordered_after} = useSelector(
    state => state.assignments.dateandslot,
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const assignDeToOrder = de => {
    setIsLoading(true);
    if (selectedOrders) {
      assignOrderService(de, selectedOrders)
        .then(res => {
          dispatch(replaceSelectedOrders([]));
          getAllService(date, slotstr, ordered_after)
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
                  dispatch(setAssignedOrders(assigndata));
                  dispatch(setOrderStateSummary(alldata[2].data));
                  dispatch(setOrders(alldata[0].data));
                });
                toast.success('orders Assigned Successfully', {
                  position: 'top-right',
                  autoClose: 1000,
                });
              }),
            )
            .catch(err => {
              console.log(err);
              toast.error('Something went wrong');
            });
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          toast.error('Something went wrong');

          setIsLoading(false);
        });
    } else {
      console.log('selete order please');
    }
  };

  return (
    <div>
      <p className="selectedOrderLabel">Assign DE :</p>
      <div className="desDiv">
        {activeDes
          ? activeDes.map(i => (
              <div key={i.id}>
                <ActiveDeCard
                  de={i}
                  assignDeToOrder={assignDeToOrder}
                  isLoading={isLoading}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default React.memo(ActiveDes);
