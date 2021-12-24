import React, {useEffect, useState} from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import img from '../../../assets/images/img.jpg';
import {IconButton} from '@mui/material';

import {BiRupee} from 'react-icons/bi';
function ProductPreviewItem({e, dispatch}) {
  const [quantity, setQuantity] = useState(e.quantity);
  console.log(e.expiresAt);
  const item = {
    ...e,
    totalQuantityPrice: e.unitPrice * quantity,
  };
  const [itemExpDate, setItemExpDate] = useState(null);
  useEffect(() => {
    if (e.expiresAt) {
      let expdate = new Date(e.expiresAt);
      setItemExpDate(expdate.toISOString().split('T')[0]);
    }
  }, [e.expiresAt]);

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
          {/* <div
            className="itemName d-flex align-items-center"
            style={{marginLeft: '10px'}}>
            <p className="p-0 m-0">{e.estimationType} Price : </p>
            <input
              type="number"
              value={e.unitPrice / e.estimationUnit || 0}
              step={0.01}
              onChange={k => {
                const newUnitPrice =
                  parseFloat(k.target.value) * e.estimationUnit;

                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    unitPrice: newUnitPrice || 0,
                    totalQuantityPrice: (newUnitPrice || 0) * e.quantity,
                  },
                });
              }}
              className="unitPrice"
            />
            <BiRupee className="mb-1" />
            
          </div> */}
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center">
        <p
          style={{
            whiteSpace: 'nowrap',
            margin: ' 0 0 7px 4px',

            fontSize: '0.8rem',
            width: '105px',
          }}>
          Num of {e.estimationType}
        </p>
        <input
          type="text"
          className="unitPrice"
          value={e.quantity * e.estimationUnit || 0}
          onChange={k => {
            const units = parseInt(k.target.value) / e.estimationUnit;
            dispatch({
              type: 'updateProducts',
              payload: {
                ...item,
                quantity: units || 0,
                totalQuantityPrice: e.unitPrice * (units || 0),
              },
            });
          }}
          // style={{width: '70px'}}
        />
      </div>
      <div className="d-flex flex-column justify-content-center">
        <p
          style={{
            whiteSpace: 'nowrap',
            margin: ' 0 0 7px 4px',
            fontSize: '0.8rem',
            width: '80px',
          }}>
          price in {e.estimationType} :{' '}
        </p>
        <div>
          <input
            type="text"
            value={e.unitPrice / e.estimationUnit || 0}
            step={0.01}
            onChange={k => {
              const newUnitPrice =
                parseFloat(k.target.value) * e.estimationUnit;

              dispatch({
                type: 'updateProducts',
                payload: {
                  ...item,
                  unitPrice: newUnitPrice || 0,
                  totalQuantityPrice: (newUnitPrice || 0) * e.quantity,
                },
              });
            }}
            className="unitPrice"
          />
          <BiRupee className="mb-1" />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <p
          style={{
            whiteSpace: 'nowrap',
            margin: ' 0 0 7px 4px',
            fontSize: '0.8rem',
          }}>
          Exp Date
        </p>
        <input
          type="date"
          className="unitPrice"
          value={itemExpDate}
          onChange={k => {
            console.log(k.target.value);
            let date = new Date(k.target.value);
            dispatch({
              type: 'updateProducts',
              payload: {
                ...item,
                expiresAt: date.getTime(),
              },
            });
          }}
          style={{width: '170px'}}
        />
      </div>

      <div className="d-flex flex-column justify-content-center ">
        <div className="qantity d-flex align-items-center">
          <p
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              marginRight: '7px',
              fontSize: '0.9rem',
            }}>
            Total Units
          </p>
          <p
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {e.quantity}
          </p>
          {/* <button
            className="counterBtn"
            onClick={() => {
              if (e.quantity > 1) {
                setQuantity(k => k - 1);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity: e.quantity - 1,
                    totalQuantityPrice: e.unitPrice * (e.quantity - 1),
                  },
                });
              } else {
                dispatch({type: 'removeProductItems', payload: item});
              }
            }}>
            <RemoveIcon fontSize="14px" />
          </button> */}
          {/* <input
            type="text"
            className="form-control counter"
            value={e.quantity || 0}
            disabled
            onChange={k => {
              dispatch({
                type: 'updateProducts',
                payload: {
                  ...item,
                  quantity: parseInt(k.target.value) || 0,
                  totalQuantityPrice:
                    e.unitPrice * parseInt(k.target.value) || 0,
                },
              });
            }}
            style={{width: '73px'}}
          /> */}
          {/* <button
            className="counterBtn"
            onClick={() => {
              setQuantity(k => k + 1);
              dispatch({
                type: 'updateProducts',
                payload: {
                  ...item,
                  quantity: e.quantity + 1,
                  totalQuantityPrice: e.unitPrice * (e.quantity + 1),
                },
              });
            }}>
            <AddOutlinedIcon fontSize="14px" />
          </button> */}
          {/* <button
            className="counterBtn"
            onClick={() => {
              if (e.quantity > 1) {
                setQuantity(k => (k * e.estimationUnit - 1) / e.estimationUnit);
                dispatch({
                  type: 'updateProducts',
                  payload: {
                    ...item,
                    quantity:
                      (e.quantity * e.estimationUnit - 1) / e.estimationUnit,
                    totalQuantityPrice:
                      e.unitPrice *
                      ((e.quantity * e.estimationUnit - 1) / e.estimationUnit),
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
            style={{width: '70px'}}
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
          </button> */}
        </div>
        <div className="d-flex align-items-center">
          <p
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              marginRight: '4px',
              fontSize: '0.9rem',
            }}>
            Unit Price :
          </p>
          <p
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            <BiRupee className="mb-1" />
            {e.unitPrice}
          </p>
          {/* <input
          type="text"
          className="form-control counter"
          value={e.unitPrice}
          disabled
          style={{width: '70px'}}
        /> */}
        </div>
        <div className="d-flex align-items-center">
          <p
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              marginRight: '4px',
              fontSize: '0.9rem',
            }}>
            Total Price :
          </p>

          <p
            // className="price"
            style={{
              whiteSpace: 'nowrap',
              margin: 0,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            <BiRupee className="mb-1" />
            {e.quantity * e.unitPrice || 0}
          </p>

          {/* <input
          type="text"
          className="form-control counter"
          value={e.unitPrice}
          disabled
          style={{width: '70px'}}
        /> */}
        </div>
      </div>
      {/* <div className="quantityDiv">
        <p className="price">
          <BiRupee className="mb-1" />
          {e.quantity * e.unitPrice || 0}
        </p>
      </div> */}
      <IconButton
        aria-label="delete"
        onClick={() => dispatch({type: 'removeProductItems', payload: item})}>
        <DeleteOutlineOutlinedIcon style={{color: 'grey'}} />
      </IconButton>
    </div>
  );
}

export default ProductPreviewItem;
