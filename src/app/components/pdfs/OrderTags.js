import React, {useState} from 'react';
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import {useEffect} from 'react';
import axios from 'axios';
import {getActiveOrderByDate} from '../assignments/AssignmentService';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#E4E4E4',
    position: 'relative',
    width: '100%',
    justifyContent: 'space-between',
  },
  section: {
    padding: 5,
    width: '50%',
    height: 167,
    border: '1px dotted black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

// Create Document Component
const OrderTags = ({date, deliveryBoy}) => {
  const [data, setData] = useState();
  const getOrders = (date, deliveryBoy) => {
    getActiveOrderByDate(date, deliveryBoy)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders(date, deliveryBoy);
  }, []);
  return data ? (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map(item => (
          <View style={styles.section}>
            <Text style={{fontSize: 20, margin: 2}}>Order Id: {item.id}</Text>
            <Text style={{fontSize: 20, margin: 2}}>
              CL Id: {item.deliveryBoyId ? item.deliveryBoyId : 'N/A'}
            </Text>
            <Text style={{fontSize: 20, margin: 2}}>
              CL Name: {item.deliveryBoyName ? item.deliveryBoyName : 'N/A'}
            </Text>
            <Text style={{fontSize: 20, margin: 2}}>
              CL phone :
              {item.deliveryBoyPhoneNumber
                ? item.deliveryBoyPhoneNumber
                : 'N/A'}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  ) : null;
};

export default OrderTags;
