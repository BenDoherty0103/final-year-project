import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import * as firebase from 'firebase'
import { db } from '../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'


export default class YourDetails extends React.Component {

  state = {
    currentUserID: '',
    users: [],
    fullName: ''
  }

  componentDidMount() {
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const users = querySnapshot.docs.map(doc => doc.data());
        users.map((user) => {
          if (user.email == firebase.auth().currentUser.email) {
            currentUserID = doc.id
            this.setState({ currentUserID })
          }
          else {
            console.log('No data')
          }
        })
        this.setState({ users })
      });
    });
  }

  handleOnPress = () => {
    const currentID = this.state.currentUserID
    const FullName = this.state.fullName
    if(FullName != ''){
      db.collection("Users").doc(currentID).update({
        fullName: FullName
      }) 
    this.props.navigation.replace('Main')
    }
    else{
      Alert.alert('Error', 'Please enter a value!')
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.textStyle}>Your Profile</Text>
        <View style={styles.itemsList}>
          {this.state.users.map((user) => {
            if (user.email == firebase.auth().currentUser.email) {
              return (
                <View style={styles.listItem}>
                  <TextInput
                    style={styles.textInput}
                    placeholder='Please enter a value'
                    onChangeText={fullName => this.setState({ fullName })}
                    value={this.state.fullName} />
                  <Button title='Submit Changes' onPress={this.handleOnPress}></Button>
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
  textInput: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 25
  },
  itemsList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  listItem: {
    paddingVertical: 5
  }
})