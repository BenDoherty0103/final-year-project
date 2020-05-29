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
    })
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
                    placeholder={user.fullName}
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