import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'


export default class ViewAll extends React.Component {
  
  state = {
    items: []
  }

  

  
 componentDidMount() {
    db.collection("RequestsList").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
          const items = querySnapshot.docs.map(doc => doc.data());
          this.setState({items})
        });
    });
 }
  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>View Requests</Text>
        <View style={styles.itemsList}>
          {this.state.items.map((item) => {
            if(item.requestingUser == firebase.auth().currentUser.email) {
            return (
                <View style={styles.listItem}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                   <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                  </TouchableOpacity>
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
