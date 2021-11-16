import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import '../css/pages/vendor.css';

import {getCodSummary} from '../../redux/actions/CodSummary';
import CodSummaryTable from '../components/codsummary/CodSummaryTable';
function CodSummary({setActiveTab}) {
  const codsummary = useSelector(state => state.codsummary.codSummary);
  console.log(codsummary);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCodSummary());
    setActiveTab(8);
  }, []);
  const columns = [
    {title: 'delivery Boy', field: 'deliveryBoyName'},
    {title: 'total COD Amount', field: 'totalCODAmount'},
    {title: 'total Refunded Amount', field: 'totalRefundedAmount'},
    {title: 'total Collected Amount', field: 'totalCollectedAmount'},
  ];
  return (
    <div className="vendor">
      <CodSummaryTable columns={columns} data={codsummary} />
    </div>
  );
}

export default CodSummary;
