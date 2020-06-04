import React from 'react'
import geolocationAPIKey from './../configs/geolocationConfig'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Geocoder from 'react-native-geocoding'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class SignUp extends React.Component {

  //Setting initial state as blank, to be filled in from signup information
  state = { fullName: '', email: '', password: '', location: '', errorMessage: null }

  //Method to create and store user, then navigate from login screen to main screen
  handleSignUp = () => {
    const { fullName, email, password } = this.state
    db.collection('Users').add({
      fullName,
      email,
      password,
      location
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

/*   componentDidMount() {
    Geocoder.init("AIzaSyBfXz4yOhxAOf4vbqOpo_eu7arUWKKO-MI")
  } */

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
/*         Geocoder.from(41.89, 12.49)
          .then(json => {
            var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
          })
          .catch(error => console.log(error)); */
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.mainHeading}>Sign Up</Text>
        <Text style={styles.subHeading}>Please fill out all fields to create an account</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Full Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={fullName => this.setState({ fullName })}
          value={this.state.fullName} />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password} />
        <Button title="Sign Up" style={styles.button} color="#e93766" onPress={this.handleSignUp} />
        <Button title="Locate me!" style={styles.button} color="#e93766" onPress={this.handleGeoLocation} />
        <Text>{this.state.latitude}</Text>
        <Text>{this.state.longitude}</Text>
        <View>
          <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainHeading: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  subHeading: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center'
  },
  textInput: {
    padding: 10,
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16
  }
})