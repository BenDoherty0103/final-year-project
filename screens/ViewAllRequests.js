import React from 'react'
import { TouchableOpacity, Button, Text, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class ViewAll extends React.Component {
  
  state = {
    items:[]
  }
  
  componentDidMount() {
    db.collection("RequestsList").get().then(querySnapshot => {
      const items = querySnapshot.docs.map(doc => doc.data());
      this.setState({items})
      console.log(this.state.items)
    });
  }
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>View Requests</Text>
        <View style={styles.itemsList}>
          {this.state.items.map((item, index) => {
            return (
                <View style={styles.listItem} key={index}>
                <TouchableOpacity >
                  <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                </TouchableOpacity>
                </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 45
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#B6A6BB',
  },
  itemsList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  listItem: {
    paddingVertical: 5
  },
  itemtext: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
