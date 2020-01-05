import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class ViewAll extends React.Component {
  state = { }
  
  componentDidMount() {
    db.ref().child('RequestsList/').on('value', (snap) => {
        this.setState(snap.val())
        console.log(this.state.itemName)
      }
    )
  }
  
  renderRequests = (request) => {
  let rows = [];
  Object.keys(request).forEach(key => {
    rows.push(<Text style={styles.rowStyle}>Object ID: {key}</Text>)
  });
  return rows;
} 

  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>View Requests</Text>
        <View style={styles.tableStyle}>
          {this.renderRequests(this.state)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 45
  },
  tableStyle: {
    alignItems: 'center'
  },
  rowStyle: {
    fontSize: 16,
    paddingVertical: 2
  }
})