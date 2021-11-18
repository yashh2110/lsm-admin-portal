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
            <p className="m-0 text-right p-1 pb-0 pt-0">{e.estimationType}</p>

            <button
              className="counterBtn"
              onClick={() => {
                if (e.quantity > 1) {
                  setQuantity(
                    k => (k * e.estimationUnit - 1) / e.estimationUnit,
                  );
                  dispatch({
                    type: 'updateProducts',
                    payload: {
                      ...item,
                      quantity:
                        (e.quantity * e.estimationUnit - 1) / e.estimationUnit,
                      totalQuantityPrice:
                        e.unitPrice *
                        ((e.quantity * e.estimationUnit - 1) /
                          e.estimationUnit),
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
              value={e.quantity * e.estimationUnit}
              onChange={k => {
                const units = parseInt(k.target.value) / e.estimationUnit;
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity: units || 0,
                    totalQuantityPrice: e.unitPrice * units,
                  },
                });
              }}
              style={{width: '50px'}}
            />
            <button
              className="counterBtn"
              onClick={() => {
                setQuantity(k => (k * e.estimationUnit + 1) / e.estimationUnit);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity:
                      (e.quantity * e.estimationUnit + 1) / e.estimationUnit,
                    totalQuantityPrice:
                      e.unitPrice *
                      ((e.quantity * e.estimationUnit + 1) / e.estimationUnit),
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
