import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class RequestDetails extends React.Component {
  
  state = {
    items: []
  }
  
  componentDidMount(props) {
    db.collection("RequestsList").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({items})
      })
    });
  }
  
  render(props) {
    return (
      <View>
        <Text style={styles.textStyle}>Request Details</Text>
        <View style={styles.itemsList}>
          {this.state.items.map((item) => {
            if(item.id == this.props.navigation.state.params) {
            return (
                <View style={styles.listItem}>
                <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                <Text style={styles.itemtext}>Item Description: {item.itemDescription}</Text>
                <Text style={styles.itemtext}>Item Location: {item.itemLocation}</Text>
                <Text style={styles.itemtext}>Requested At: {item.requestedAt}</Text>
                </View>
            )
            }
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
