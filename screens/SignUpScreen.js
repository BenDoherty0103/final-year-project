import React from 'react'
import { Text, TextInput, View, Button } from 'react-native'
import Geocoder from 'react-native-geocoding'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class SignUp extends React.Component {

  //Setting initial state as blank, to be filled in from signup information
  state = { fullName: '', email: '', password: '', errorMessage: null }

  //Method to create and store user, then navigate from login screen to main screen
  handleSignUp = () => {
    const { fullName, email, password, town, latitude, longitude } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .then(() => {
        db.collection('Users').add({
          fullName,
          email,
          password,
          town,
          latitude,
          longitude
        }).catch((error) => {
          //error callback
          console.log('error ', error)
        })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  componentDidMount() {
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
            this.setState({ town: addressComponent.long_name })
          })
          .catch(error => console.log(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }


  render() {
    return (
      <View style={Styles.loginContainer}>
        <Text style={Styles.requestMainHeading}>Sign Up</Text>
        <Text style={Styles.requestSubHeading}>Please fill out all fields to create an account</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Full Name"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={fullName => this.setState({ fullName })}
          value={this.state.fullName} />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={email => this.setState({ email })}
          value={this.state.email} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={password => this.setState({ password })}
          value={this.state.password} />
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
        <View>
          <Text style={Styles.requestSubHeading}> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
        </View>
      </View>
    )
  }
}