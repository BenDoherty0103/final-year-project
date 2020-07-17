import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from '../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'
import Geocoder from 'react-native-geocoding'


export default class YourDetails extends React.Component {

  state = {
    currentUserID: '',
    users: [],
    fullName: ''
  }

  componentDidMount() {
    Geocoder.init("AIzaSyBAzY7hX1PYVw5eU-k24mR7FeK_Uc9P0Sk")
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const users = querySnapshot.docs.map(doc => doc.data());
        users.map((user) => {
          if (user.email == firebase.auth().currentUser.email) {
            currentUserID = doc.id
            this.setState({ currentUserID })
            Geocoder.from(user.latitude, user.longitude)
              .then(json => {
                var addressComponent = String(json.results[0].address_components[2].long_name)
                this.SetState({ Town: addressComponent });
              })
              .catch(error => console.warn(error));
          }
        })
        this.setState({ users })
      });
    });
  }

  handleGetGeolocation = (newAddress) => {
    Geocoder.from(newAddress)
      .then(json => {
        var location = json.results[0].geometry.location;
        this.setState({ latitude: location.lat })
        this.setState({ longitude: location.lng })
      })
      .catch(error => console.warn(error));
  }

  handleOnPress = (props) => {
    users = []
    ids = []
    match = []
    const FullName = this.state.fullName
    const Location = this.state.location
    Geocoder.from(Location)
      .then(json => {
        var location = json.results[0].geometry.location; //.address_components[2]
        var addressComponent = json.results[0].address_components[2].long_name
        this.setState({ latitude: location.lat })
        this.setState({ longitude: location.lng })
        this.setState({ Town: addressComponent })
        const lat = this.state.latitude
        const lng = this.state.longitude
        const newTown = this.state.Town
        db.collection("Users").get().then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            users.push(doc.data())
            ids.push(doc.id)
          })
          this.setState({ users })
          this.state.users.map((user, i) => {
            if (user.email == firebase.auth().currentUser.email) {
              const matchIndex = i
              const matchID = ids[matchIndex]
              if (FullName != '') {
                db.collection("Users").doc(matchID).update({
                  fullName: FullName,
                  location: Location,
                  latitude: lat,
                  longitude: lng,
                  town: newTown
                })
                .then(() => this.props.navigation.replace('Main'))
                .catch(error => this.setState({ errorMessage: error.message }))
              }
              else {
                Alert.alert('Error', 'Please enter a value!')
              }
            }
          })
        })
      })
      .catch(error => this.setState({ errorMessage: 'Please enter a value!' }))
  }

  render() {
    return (
      <View style={Styles.requestMainContainer}>
        <Text style={Styles.requestMainHeading}>Your Profile</Text>
        <Text style={Styles.requestSubHeading}>If you need to change any of your details, simply enter the new value in the box and press the submit button.</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <View style={Styles.requestsList}>
          {this.state.users.map((user) => {
            if (user.email == firebase.auth().currentUser.email) {
              return (
                <View>
                  <TextInput
                    style={Styles.requestTextArea}
                    placeholder={String('Name: ' + user.fullName)}
                    onChangeText={fullName => this.setState({ fullName })}
                    value={this.state.fullName} />
                  <TextInput
                    style={Styles.requestTextArea}
                    placeholder={String('Full Address (including postcode): ' + user.location)}
                    onChangeText={location => this.setState({ location })}
                    value={this.state.location} />
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