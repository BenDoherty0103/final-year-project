import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import Styles from '../assets/Styles'
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

  handleOnPress = (props) => {
    users = []
    ids = []
    match = []
    const FullName = this.state.fullName
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        users.push(doc.data())
        ids.push(doc.id)
      })
      this.setState({ users })
      this.state.users.map((user, i) => {
        if (user.email == firebase.auth().currentUser.email) {
          match.push(user, i)
        }
      })
      var i = 0;
      for (var id in ids) {
        i++
        if (i == match[1]) {
          const matchID = ids[i]
          this.setState({ matchID })
        }
      }
      if (FullName != '') {
        db.collection("Users").doc(String(this.state.matchID)).update({
          fullName: FullName
        })
      }
      else {
        Alert.alert('Error', 'Please enter a value!')
      }
      this.props.navigation.navigate('YourProfile')
    })
  }

  render() {
    return (
      <View style={Styles.requestMainContainer}>
        <Text style={Styles.requestMainHeading}>Your Profile</Text>
        <Text style={Styles.requestSubHeading}>If you need to change any of your details, simply enter the new value in the box and press the submit button.</Text>
        <View style={Styles.requestsList}>
          {this.state.users.map((user) => {
            if (user.email == firebase.auth().currentUser.email) {
              return (
                <View style={Styles.listItem}>
                  <TextInput
                    style={Styles.requestText}
                    placeholder='Name'
                    onChangeText={fullName => this.setState({ fullName })}
                    value={this.state.fullName} />
                  <View style={Styles.requestSubmit}>
                    <Button title='Submit Changes' color="#e93766" onPress={this.handleOnPress}></Button>
                  </View>
                </View>
              )
            }
          })}
        </View>
      </View>
    )
  }
}