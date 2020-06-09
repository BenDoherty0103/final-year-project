import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Geocoder from 'react-native-geocoding'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'

export default class NewCommodity extends React.Component {

  state = { itemName: '', itemDescription: '', itemLocation: '', requestedBy: '', requestedAt: '', category: '', id: '', isOpen: true }

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
    Geocoder.init("AIzaSyBfXz4yOhxAOf4vbqOpo_eu7arUWKKO-MI")
    this.handleGeoLocation()
  }

  handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude)
        const longitude = JSON.stringify(position.coords.longitude)
        this.setState({
          latitude,
          longitude
        })
        const lat = parseFloat(this.state.latitude)
        const lng = parseFloat(this.state.longitude)
        Geocoder.from(lat, lng)
          .then(json => {
            var addressComponent = json.results[0].address_components[2];
            this.setState({ itemLocation: addressComponent.long_name })
          })
          .catch(error => console.log(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  handleItems = () => {
    const id = uuid.v1().toString()
    const requestingUser = firebase.auth().currentUser.email
    const category = 'Commodity'
    const { itemName, itemDescription, itemLocation, requestedAt, isOpen } = this.state
    db.collection('RequestsList').add({
      itemName,
      itemDescription,
      itemLocation,
      requestedAt,
      id,
      isOpen,
      requestingUser,
      category
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
    this.props.navigation.replace('Main')
  }

  render() {
    return (
      <View style={Styles.requestMainContainer}>
        <Text style={Styles.requestMainHeading}>New commodity request</Text>
        <Text style={Styles.requestSubHeading}>Please fill out the fields below, and try to be as descriptive as possible.</Text>
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
