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
    Geocoder.init("AIzaSyBAzY7hX1PYVw5eU-k24mR7FeK_Uc9P0Sk")
    const { fullName, email, password, address, town, postcode } = this.state
    const location = String(address + ' ' + town + ' ' + postcode)
    Geocoder.from(location)
      .then(json => {
        var loc = json.results[0].geometry.location;
        const latitude = String(loc.lat)
        const longitude = String(loc.lng)
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            db.collection('Users').add({
              fullName,
              email,
              password,
              location,
              town,
              latitude,
              longitude
            }).catch((error) => {
              //error callback
              console.log('error ', error)
            })
          })
          .then(() => this.props.navigation.navigate('Main'))
          .catch(error => this.setState({ errorMessage: error.message }))
      })
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
          placeholder="Address Line 1"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={address => this.setState({ address })}
          value={this.state.address} />
        <TextInput
          placeholder="Town"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={town => this.setState({ town })}
          value={this.state.town} />
        <TextInput
          placeholder="Postcode"
          autoCapitalize="none"
          style={Styles.requestText}
          onChangeText={postcode => this.setState({ postcode })}
          value={this.state.postcode} />
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