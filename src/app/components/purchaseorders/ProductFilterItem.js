import React, {useState} from 'react';
import Button from '@mui/material/Button';
import img from '../../../assets/images/img.jpg';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import {BiRupee} from 'react-icons/bi';
function ProductFilterItem({i, dispatch, addedProducts}) {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(i.discountedPrice);
  const item = {
    item: i,
    itemId: i.id,
    quantity: quantity,
    unitPrice: unitPrice,
    totalQuantityPrice: unitPrice * quantity,
  };
  const isProductAdded = () => {
    if (addedProducts.length === 0) return false;
    let count = 0;
    addedProducts.map(item => {
      if (item.itemId === i.id) {
        count = count + 1;
      }
      return count;
    });
    if (count === 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="filterItem">
      <div className="filterDet">
        <img
          src={
            i.productImageInfoList[0]
              ? i.productImageInfoList[0].mediumImagePath
              : img
          }
          alt="img"
          className="filterItemImg"
        />
        <div className="filterItemNamePrice">
          <p className="filterItemName">
            {i.name} ({i.subName})
          </p>
          <div className="filterItemPrice d-flex align-items-center">
            <p className="p-0 m-0">Unit Price : </p>
            <input
              type="number"
              value={unitPrice}
              step={0.01}
              onChange={e => {
                const newUnitPrice = e.target.value || 0;
                setUnitPrice(newUnitPrice);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    unitPrice: newUnitPrice,
                    totalQuantityPrice: newUnitPrice * quantity,
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
      <div className="filterItemQuantityAdd">
        {!isProductAdded() ? (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => dispatch({type: 'addProductItems', payload: item})}>
            Add
          </Button>
        ) : (
          <div className="qantity d-flex">
            <button
              className=" counterBtn"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(e => e - 1);
                  dispatch({
                    type: 'updateProducts',
                    payload: {
                      ...item,
                      quantity: quantity - 1,
                      totalQuantityPrice: unitPrice * (quantity - 1),
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
              value={quantity}
              onChange={e => {
                setQuantity(parseInt(e.target.value) || 0);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity: parseInt(e.target.value) || null,
                    totalQuantityPrice: unitPrice * (e.target.value - 1),
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
                    quantity: quantity + 1,
                    totalQuantityPrice: unitPrice * (quantity + 1),
                  },
                });
              }}>
              <AddOutlinedIcon fontSize="14px" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductFilterItem;
