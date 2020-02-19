import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import db from './../configs/firebaseConfig'



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
      <View style={styles.mainContainer}>
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})