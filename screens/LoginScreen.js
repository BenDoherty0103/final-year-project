import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
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
      <View style={styles.mainContainer}>
        <Text style={{color:'black', fontSize: 30, textAlign: 'center'}}>Welcome!</Text>
        <Text style={{color:'black', fontSize: 15, textAlign: 'center'}}>Please login or create an account</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign up </Text></Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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