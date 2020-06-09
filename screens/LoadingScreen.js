import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import Styles from '../assets/Styles'



export default class Loading extends React.Component {
  //Check authentication status and navigate from there
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.replace(user ? 'Main' : 'Login')
    })
}

  //Standard render method for loading wheel
  render() {
    return (
      <View style={Styles.loadingContainer}>
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}