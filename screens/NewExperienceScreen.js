import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'

export default class NewExperience extends React.Component {

  state = { itemName: '', itemDescription: '', requestedBy: '', requestedAt: '', category: '', id: '', isOpen: true }

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.setState({
      //Setting the value of the date time
      requestedAt:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min,
    });
    this.handleGeoLocation()
  }

  handleGeoLocation = () => {
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const users = querySnapshot.docs.map(doc => doc.data());
        users.map((user) => {
          if (user.email == firebase.auth().currentUser.email) {
            this.setState({ community: user.town })
          }
        })
        this.setState({ users })
      })
    }).catch(error => this.setState({ errorMessage: error.message }))
  }

  handleItems = () => {
    const id = uuid.v1().toString()
    const requestingUser = firebase.auth().currentUser.email
    const category = 'Experience'
    const { community, itemName, itemDescription, requestedAt, isOpen } = this.state
    if (itemName != '' && itemDescription != '') {
      db.collection('RequestsList').add({
        community,
        itemName,
        itemDescription,
        requestedAt,
        id,
        isOpen,
        requestingUser,
        category
      })
        .then(() => this.props.navigation.replace('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    else {
      this.setState({ errorMessage: 'Please enter a value!' })
    }
  }

  render() {
    return (
      <View style={Styles.requestMainContainer}>
        <Text style={Styles.requestMainHeading}>New experience request</Text>
        <Text style={Styles.requestSubHeading}>Please fill out the fields below, and try to be as descriptive as possible.</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <TextInput
          style={Styles.requestText}
          placeholder="Title"
          onChangeText={itemName => this.setState({ itemName })}
          value={this.state.itemName} />
        <TextInput
          style={Styles.requestTextArea}
          placeholder="Description"
          numberOfLines={5}
          onChangeText={itemDescription => this.setState({ itemDescription })}
          value={this.state.itemDescription} />
        <View style={Styles.requestSubmit}>
          <Button title="Submit" color="#e93766" onPress={this.handleItems} />
        </View>
      </View>
    )
  }
}