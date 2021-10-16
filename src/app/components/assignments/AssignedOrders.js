import React, {useState} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {
  setAssignedOrders,
  setOrders,
  setOrderStateSummary,
} from '../../../redux/actions/Assignments';
import DownloadIcon from '@mui/icons-material/Download';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DeleteIcon from '@mui/icons-material/Delete';

import {toast} from 'react-toastify';
import {
  deleteAssignmentService,
  downloadInvoicesService,
  getAllService,
  makeTransitService,
} from './AssignmentService';
import axios from 'axios';
import {Table, Column, HeaderCell, Cell} from 'rsuite-table';

import 'rsuite-table/dist/css/rsuite-table.css';
import 'rsuite/styles/index.less';

import {Checkbox, Fab} from '@material-ui/core';
import AssignmentsTableToolBar from './AssignmentsTableToolBar';

function AssignedOrders({assignedOrders}) {
  const dispatch = useDispatch();
  const {date, slotstr} = useSelector(state => state.assignments.dateandslot);

  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

  if (assignedOrders.length > 0) {
    if (checkedKeys.length === assignedOrders.length) {
      checked = true;
    } else if (checkedKeys.length === 0) {
      checked = false;
    } else if (
      checkedKeys.length > 0 &&
      checkedKeys.length < assignedOrders.length
    ) {
      indeterminate = true;
    }
  }

  const handleCheckAll = e => {
    const keys = e.target.checked ? assignedOrders.map(item => item.id) : [];
    setCheckedKeys(keys);
    console.log(keys);
  };
  const handleCheck = e => {
    const keys = e.target.checked
      ? [...checkedKeys, e.target.value]
      : checkedKeys.filter(item => item !== e.target.value);
    setCheckedKeys(keys);
    console.log(keys);
  };

  const deleteAssignment = rowData => {
    deleteAssignmentService(rowData)
      .then(res => {
        getAllService(date, slotstr)
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
              toast.success('Deleted Successfully', {
                position: 'top-right',
                autoClose: 1000,
              });
              batch(() => {
                dispatch(setOrders(alldata[0].data));
                dispatch(setAssignedOrders(assigndata));
                dispatch(setOrderStateSummary(alldata[2].data));
              });
            }),
          )
          .catch(err => {
            console.log(err);
            toast.error('Something went wrong');
          });
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  const makeTransit = async rowData => {
    makeTransitService(rowData)
      .then(res => {
        toast.success('Order is in transit now', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };

  return (
    <div style={{position: 'relative', height: '600px'}}>
      <AssignmentsTableToolBar
        checkedKeys={checkedKeys}
        title="Assignment Orders"
        downloadEstimation={true}
      />
      <Table
        wordWrap
        height={500}
        data={assignedOrders}
        id="table"
        affixHeader
        bordered
        cellBordered>
        <Column width={50} align="center">
          <HeaderCell style={{padding: 0}}>
            <div style={{lineHeight: '40px'}}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <Cell style={{padding: 0}}>
            {rowData => (
              <div style={{lineHeight: '46px'}}>
                <Checkbox
                  value={rowData.id}
                  inline
                  onChange={handleCheck}
                  checked={checkedKeys.some(i => i === rowData.id)}
                />
              </div>
            )}
          </Cell>
        </Column>
        <Column>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={200} resizable>
          <HeaderCell>Delivary Executive</HeaderCell>
          <Cell dataKey="de" />
        </Column>
        <Column flexGrow={2} width={300}>
          <HeaderCell>Orders</HeaderCell>
          <Cell>
            {rowData => (
              <p style={{maxWidth: '400px'}}>{rowData.orders.join(', ')}</p>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell className="link-group">
            {rowData => (
              <>
                <Fab
                  color="light"
                  size="small"
                  style={{
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    marginRight: '5px',
                  }}
                  aria-label="add"
                  onClick={() => makeTransit(rowData)}>
                  <DeliveryDiningIcon fontSize={'100px'} />
                </Fab>
                <Fab
                  color="light"
                  size="small"
                  style={{
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    marginRight: '5px',
                  }}
                  aria-label="add"
                  onClick={() => downloadInvoicesService(rowData)}>
                  <DownloadIcon fontSize={'100px'} />
                </Fab>

                <Fab
                  color="light"
                  size="small"
                  style={{
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    marginRight: '5px',
                  }}
                  aria-label="add"
                  onClick={() => deleteAssignment(rowData)}>
                  <DeleteIcon fontSize={'100px'} />
                </Fab>
              </>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default AssignedOrders;
