import React from 'react'
import { Button, Text, StyleSheet, View } from 'react-native'
import * as firebase from 'firebase'
import { db } from '../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'


export default class YourDetails extends React.Component {
  
  state = {
    users: []
  }

  

  
 componentDidMount() {
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
          const users = querySnapshot.docs.map(doc => doc.data());
          this.setState({users})
        });
    });
 }
  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>Your Profile</Text>
        <View style={styles.itemsList}>
        {this.state.users.map((user) => {
            if(user.email == firebase.auth().currentUser.email) {
            return (
                <View style={styles.listItem}>
                   <TextInput style={styles.itemtext}>Item Name: {user.email}</TextInput>
                   <TextInput style={styles.itemtext}>Item Name: {user.fullName}</TextInput>
                   <TextInput style={styles.itemtext}>Item Name: {user.password}</TextInput>
                   <Button title='Submit Changes'></Button>
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