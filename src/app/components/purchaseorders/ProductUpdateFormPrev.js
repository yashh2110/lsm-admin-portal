import React, {useState} from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import img from '../../../assets/images/img.jpg';
import {IconButton} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import {BiRupee} from 'react-icons/bi';
function ProductUpdateFormPrev({e, dispatch}) {
  const [quantity, setQuantity] = useState(e.quantity);
  const item = {
    ...e,
    totalPrice: e.unitPrice * quantity,
  };
  return (
    <div className="item">
      <div className="itemDet">
        <img src={img} alt="" className="itemImg" />
        <div className="">
          <p className="itemName">{e.itemName}</p>
          <div
            className="itemName d-flex align-items-center"
            style={{marginLeft: '10px'}}>
            <p className="p-0 m-0">Unit Price : </p>
            <input
              type="number"
              value={e.unitPrice}
              onChange={k => {
                const newUnitPrice = parseInt(k.target.value) || 0;
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    unitPrice: newUnitPrice,
                    totalPrice: newUnitPrice * e.quantity,
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
                      totalPrice: e.unitPrice * (e.quantity - 1),
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
                    totalPrice: e.unitPrice * (k.target.value - 1),
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
                    totalPrice: e.unitPrice * (e.quantity + 1),
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

export default ProductUpdateFormPrev;
