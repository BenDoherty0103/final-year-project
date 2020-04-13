import React from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
  Picker,
} from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'

export default class MakeNewRequest extends React.Component {

  state = { itemName: '', itemDescription: '', itemLocation: '', requestedBy: '', requestedAt: '', category: '', id: '', isOpen: true }

  componentDidMount() {
  }

  handleItems = () => {
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
    const id = uuid.v1().toString()
    const requestingUser = firebase.auth().currentUser.email
    const { itemName, itemDescription, itemLocation, requestedAt, isOpen } = this.state
    db.collection('RequestsList').add({
      itemName,
      itemDescription,
      itemLocation,
      requestedAt,
      id,
      isOpen,
      requestingUser
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
    this.props.navigation.replace('Main')
  }

  render() {
    return (
      <View style={Styles.requestContainer}>
        <Text style={Styles.mainHeading}>Make a new request</Text>
        <Text style={Styles.subHeading}>Please fill out the fields below.</Text>
        <TextInput
          style={Styles.textInput}
          placeholder="Item Name"
          onChangeText={itemName => this.setState({ itemName })}
          value={this.state.itemName} />
        <TextInput
          style={Styles.textInput}
          placeholder="Item Description"
          onChangeText={itemDescription => this.setState({ itemDescription })}
          value={this.state.itemDescription} />
        <TextInput
          style={Styles.textInput}
          placeholder="Item Location"
          onChangeText={itemLocation => this.setState({ itemLocation })}
          value={this.state.itemLocation} />
        <Picker
          style={Styles.pick}
          selectedValue={(this.state && this.state.pickerValue) || 'Commodity'}
          onValueChange={(value) => {
            this.setState({ value })
          }}>
          <Picker.Item label={'Commodity'} value={'Commodity'} />
          <Picker.Item label={'Experience'} value={'Experience'} />
          <Picker.Item label={'Rideshare'} value={'Rideshare'} />
        </Picker>
        <Button title="Submit" onPress={this.handleItems} />
      </View>

    )
  }
}