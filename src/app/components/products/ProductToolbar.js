import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductsWithFilter,
  productActiveFilter,
  productCatergoryFilter,
  productNameFilter,
} from '../../../redux/actions/Products';
import '../../css/common/Toolbar.css';
function ProductToolbar({setPage, setCreateopen}) {
  const cat = useSelector(state => state.products.catogories);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);
  const filter = ({type, payload}) => {
    setPage(0);
    switch (type) {
      case 'name':
        setName(payload);
        dispatch(productNameFilter(payload));
        dispatch(getProductsWithFilter({name: payload, category, active}));
        return;
      case 'active':
        setActive(payload);
        dispatch(productActiveFilter(payload));
        dispatch(getProductsWithFilter({active: payload, category, name}));
        return;
      case 'category':
        setCategory(payload);
        dispatch(productCatergoryFilter(payload));
        dispatch(getProductsWithFilter({category: payload, active, name}));
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
      <div className="title">Products</div>
      <div className="filter ">
        <button
          className="btn "
          onClick={() => setCreateopen(true)}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
          }}>
          Create
        </button>

        <input
          className="form-control name"
          type="text"
          placeholder="Search Name"
          value={name}
          onChange={e => {
            filter({type: 'name', payload: e.target.value});
          }}
        />
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

export default ProductToolbar;
