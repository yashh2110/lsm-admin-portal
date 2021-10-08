import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router';
import {
  getLsProductsWithFilter,
  getLowStockProducts,
  productActiveFilter,
  productCatergoryFilter,
} from '../../../../redux/actions/Products';

import '../../../css/common/Toolbar.css';
function LsProductToolbar({setPage}) {
  const cat = useSelector(state => state.products.catogories);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const filters = useSelector(state => state.products.filters);
  const filter = ({type, payload}) => {
    setPage(0);
    switch (type) {
      case 'active':
        setActive(payload);
        dispatch(productActiveFilter(payload));
        dispatch(getLsProductsWithFilter({active: payload, category, name}));
        return;
      case 'category':
        setCategory(payload);
        dispatch(productCatergoryFilter(payload));
        dispatch(getLsProductsWithFilter({category: payload, active, name}));
        return;
      case 'lowstock':
        dispatch(getLowStockProducts());
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    if (filters.name) setName(filters.name);
    if (filters.category) setCategory(filters.category);
    if (filters.active) setActive(filters.active);
  }, [filters]);

  return (
    <div className="toolbar">
      <div
        onClick={() => {
          history.goBack();
        }}
        className="d-flex align-items-center">
        <ArrowBackOutlinedIcon sx={{fontSize: '24px', marginRight: '10px'}} />
        <div className="title" style={{whiteSpace: 'nowrap'}}>
          Low Stocks
        </div>
      </div>
      <div className="filter justify-content-end">
        <select
          className="form-control category"
          onChange={e => filter({type: 'category', payload: e.target.value})}
          value={category}>
          <option value="">Category</option>
          {cat ? (
            cat.map(i => (
              <option value={i.id} key={i.id}>
                {i.displayName}
              </option>
            ))
          ) : (
            <option disabled>none</option>
          )}
        </select>
        <select
          className="form-control active"
          value={active}
          onChange={e => filter({type: 'active', payload: e.target.value})}>
          <option value="">Active</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    </div>
  );
}

export default LsProductToolbar;
