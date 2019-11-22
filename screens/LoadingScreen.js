import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAIG9h0iIqTD5emeETQVmfzzDZG3-xYbYE",
    authDomain: "final-year-project-4e017.firebaseapp.com",
    databaseURL: "https://final-year-project-4e017.firebaseio.com",
    projectId: "final-year-project-4e017",
    storageBucket: "final-year-project-4e017.appspot.com",
    messagingSenderId: "1074818923418",
    appId: "1:1074818923418:web:9f45330d3f6ef8cd441823",
    measurementId: "G-F6MCJQSRLZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    })
}

    render() {
        return (
        <View style={styles.container}>
            <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
            <ActivityIndicator color='#e93766' size="large" />
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})