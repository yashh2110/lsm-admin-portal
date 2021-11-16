import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductCategory} from '../../redux/actions/Products';

import '../css/pages/vendor.css';

import {getEstimations} from '../../redux/actions/Estimation';
import EstimationsTable from '../components/estimation/EstimationTable';

function Estimations({setActiveTab}) {
  const {category, startDate, endDate, slotId} = useSelector(
    state => state.estimations,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getEstimations({
        endDate,
        category,
        startDate,
        slotId,
      }),
    );
    dispatch(getProductCategory());
    setActiveTab(11);
  }, []);

  const columns = [
    {
      title: 'Id',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Item Actual Price',
      field: 'itemActualPrice',
    },
    {title: 'Item Sub Name', field: 'itemSubName'},
    {title: 'On Demand', field: 'onDemand'},
    {title: 'Total Estimation', field: 'totalEstimation'},
    {title: 'Item Discounted Price', field: 'itemDiscountedPrice'},
    {title: 'Quantity', field: 'quantity'},
  ];
  return (
    <div className="vendor">
      <EstimationsTable columns={columns} />
    </div>
  );
}

export default Estimations;
