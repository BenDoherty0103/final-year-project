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
    rows.push(<Text>{key + ' ' + request[key]}</Text>)
  });
  return rows;
} 

  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>View Requests</Text>
        {this.renderRequests(this.state)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subheaderStyle: {
        fontSize: 20
    }
})