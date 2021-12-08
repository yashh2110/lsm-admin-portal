import React, {useState} from 'react';
import {Cell, Column, HeaderCell} from 'rsuite-table';
import Table from 'rsuite/Table';

function OrderItemsTable({data}) {
  return (
    <div className="mt-0">
      <p
        style={{
          fontSize: '1.3rem',
          fontWeight: '500',
          margin: '3px',
          marginLeft: '27px',
          opacity: '0.7',
        }}>
        Items
      </p>
      <Table id="table" height={500} affixHeader bordered data={data}>
        <Column flexGrow={1}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Item Id</HeaderCell>
          <Cell dataKey="itemId" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Item Name</HeaderCell>
          <Cell dataKey="itemName" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Item Sub Name</HeaderCell>
          <Cell dataKey="itemSubName" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="category" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Market Price</HeaderCell>
          <Cell dataKey="marketPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Total Price</HeaderCell>
          <Cell dataKey="totalPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Unit Price</HeaderCell>
          <Cell dataKey="unitPrice" style={{fontSize: '0.8rem', margin: 0}} />
        </Column>
      </Table>
    </div>
  );
}

export default OrderItemsTable;
