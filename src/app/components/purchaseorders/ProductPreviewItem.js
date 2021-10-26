import React, {useState} from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import img from '../../../assets/images/img.jpg';
import {IconButton} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import {BiRupee} from 'react-icons/bi';
function ProductPreviewItem({e, dispatch}) {
  const [quantity, setQuantity] = useState(e.quantity);
  const item = {
    ...e,
    totalQuantityPrice: e.unitPrice * quantity,
  };
  return (
    <div className="item">
      <div className="itemDet">
        <img
          src={
            e.item.productImageInfoList[0]
              ? e.item.productImageInfoList[0].mediumImagePath
              : img
          }
          alt=""
          className="itemImg"
        />
        <div className="">
          <p className="itemName">
            {e.item.name} ({e.item.subName})
          </p>
          <div
            className="itemName d-flex align-items-center"
            style={{marginLeft: '10px'}}>
            <p className="p-0 m-0">Unit Price : </p>
            <input
              type="number"
              value={e.unitPrice}
              step={0.01}
              onChange={k => {
                const newUnitPrice = k.target.value || 0;
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    unitPrice: newUnitPrice,
                    totalQuantityPrice: newUnitPrice * e.quantity,
                  },
                });
              }}
              className="unitPrice"
            />
            <BiRupee className="mb-1" />
            {/* {unitPrice * quantity} */}
          </div>
        </div>
      </div>
      <div className="quantityDiv">
        <p className="price">
          <BiRupee className="mb-1" />
          {e.quantity * e.unitPrice}
        </p>

        <div className="d-flex justify-content-center align-items-center">
          <IconButton
            aria-label="delete"
            onClick={() =>
              dispatch({type: 'removeProductItems', payload: item})
            }>
            <DeleteOutlineOutlinedIcon style={{color: 'grey'}} />
          </IconButton>
          <div className="qantity d-flex">
            <button
              className="counterBtn"
              onClick={() => {
                if (e.quantity > 1) {
                  setQuantity(e => e - 1);
                  dispatch({
                    type: 'updateProducts',
                    payload: {
                      ...item,
                      quantity: parseInt(e.quantity) - 1,
                      totalQuantityPrice: e.unitPrice * (e.quantity - 1),
                    },
                  });
                } else {
                  dispatch({type: 'removeProductItems', payload: item});
                }
              }}>
              <RemoveIcon fontSize="14px" />
            </button>
            <input
              type="text"
              className="form-control counter"
              value={e.quantity}
              onChange={k => {
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity: parseInt(k.target.value) || 0,
                    totalQuantityPrice: e.unitPrice * (k.target.value - 1),
                  },
                });
              }}
              style={{width: '50px'}}
            />
            <button
              className="counterBtn"
              onClick={() => {
                setQuantity(e => e + 1);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity: parseInt(e.quantity) + 1,
                    totalQuantityPrice: e.unitPrice * (e.quantity + 1),
                  },
                });
              }}>
              <AddOutlinedIcon fontSize="14px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreviewItem;
