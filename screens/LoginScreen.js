import React from 'react'
import { Text, TextInput, View, Button, Image } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'

export default class Login extends React.Component {
  //Setting initial state as blank, to be filled in from firebase authentication information
  state = { email: '', password: '', errorMessage: null }

  //Method to assign user state and navigate from login screen to main screen
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.replace('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={Styles.loginContainer}>
        <Text style={Styles.requestMainHeading}>Welcome!</Text>
        <Text style={Styles.requestSubHeading}>Please login or create an account</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <TextInput style={Styles.requestText}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={Styles.requestText}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <Text style={Styles.requestSubHeading}> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{ color: '#e93766', fontSize: 18 }}> Sign up </Text></Text>
      </View>
    )
  }
}