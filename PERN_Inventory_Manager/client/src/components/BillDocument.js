import React from 'react';
import { Page, Document, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCell: {
   
    padding: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  total: {
    marginTop: 30,
    textAlign: 'right',
    marginRight: 60,
    fontWeight: 'bold',
  },
});

const BillDocument = ({ name, email, address, date, products, totalPrice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Invoice</Text>

      <View style={styles.info}>
        <Text>Billed To:</Text>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{address}</Text>
        <Text>{date}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableHeader]}>
            <Text>S.no.</Text>
          </View>
          <View style={[styles.tableCell, styles.tableHeader]}>
            <Text>Name</Text>
          </View>
          <View style={[styles.tableCell, styles.tableHeader]}>
            <Text>Company</Text>
          </View>
          <View style={[styles.tableCell, styles.tableHeader]}>
            <Text>Price</Text>
          </View>
        </View>
        {products.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCell}>
              <Text>{index + 1}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.productname}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.company}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>$ {item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total Price: $ {totalPrice}</Text>
    </Page>
  </Document>
);

export default BillDocument;
