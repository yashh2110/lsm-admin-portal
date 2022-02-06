import React, {useState} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {
  setAssignedOrders,
  setOrders,
  setOrderStateSummary,
} from '../../../redux/actions/Assignments';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
import {Dropdown, Whisper, Popover} from 'rsuite';
import {Dialog} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {PDFViewer} from '@react-pdf/renderer';
import OrderTags from '../pdfs/OrderTags';

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

const RenderMenu = React.forwardRef(
  (
    {
      onClose,
      rowdata,
      setSelectedData,
      setDeliveryBoy,
      deleteAssignment,
      setOpen,
      ...rest
    },
    ref,
  ) => {
    const handleSelect = eventKey => {
      onClose();
    };
    return (
      <Popover ref={ref} {...rest} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            onClick={() => {
              makeTransit(rowdata);
            }}>
            Move to transit
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              downloadInvoicesService(rowdata);
            }}>
            Download Invoices
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              deleteAssignment(rowdata);
            }}>
            Delete Assignment
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setDeliveryBoy(rowdata.id);
              setOpen(true);
            }}>
            Print Order Tags
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  },
);

function AssignedOrders() {
  const popref = React.useRef();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {date, slotstr} = useSelector(state => state.assignments.dateandslot);
  const {assignedOrders} = useSelector(state => state.assignments);
  const [selectedData, setSelectedData] = useState();
  const [deliveryBoy, setDeliveryBoy] = useState();
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
    const keys = e.target.checked
      ? assignedOrders.map(item => item.orders.toString())
      : [];
    setCheckedKeys(keys);
    console.log(keys);
  };
  const handleCheck = e => {
    const keys = e.target.checked
      ? [...checkedKeys, e.target.value.toString()]
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
                inline={true}
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
                  value={rowData.orders}
                  inline={true}
                  onChange={handleCheck}
                  checked={checkedKeys.some(
                    i => i === rowData.orders.toString(),
                  )}
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
                <Whisper
                  placement="autoVerticalEnd"
                  trigger="click"
                  ref={popref}
                  speaker={
                    <RenderMenu
                      rowdata={rowData}
                      setDeliveryBoy={setDeliveryBoy}
                      setOpen={setOpen}
                      deleteAssignment={deleteAssignment}
                      setSelectedData={setSelectedData}
                      onClose={() => popref.current.close()}
                    />
                  }>
                  <MoreHorizIcon />
                </Whisper>

                {/* <Fab
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
                </Fab> */}
              </>
            )}
          </Cell>
        </Column>
      </Table>
      {deliveryBoy ? (
        <Dialog
          onClose={() => {
            setOpen(false);
            setDeliveryBoy(null);
          }}
          open={open}
          fullWidth
          maxWidth={800}>
          <CloseOutlinedIcon
            onClick={() => {
              setDeliveryBoy(null);
              setOpen(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              color: 'grey',
              margin: '10px',
              fontSize: '2rem',
              backgroundColor: 'rgba(233, 224, 224)',
              borderRadius: '50%',
            }}
          />
          <PDFViewer
            style={{width: '100%', height: '100vh'}}
            fileName={date + '.pdf'}>
            <OrderTags date={date} deliveryBoy={deliveryBoy} />
          </PDFViewer>
        </Dialog>
      ) : null}
    </div>
  );
}

export default AssignedOrders;
