import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Picker,
} from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'

export default class NewExperience extends React.Component {

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
    }
  
    handleItems = () => {
      const id = uuid.v1().toString()
      const requestingUser = firebase.auth().currentUser.email
      const category = 'Experience'
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
        <View style={styles.MainContainer}>
          <Text style={styles.MainHeading}>New experience request</Text>
          <Text style={styles.SubHeading}>Please fill out the fields below, and try to be as descriptive as possible.</Text>
          <TextInput
            style={styles.Text}
            placeholder="Title"
            onChangeText={itemName => this.setState({ itemName })}
            value={this.state.itemName} />
          <TextInput
            style={styles.textArea}
            placeholder="Description"
            numberOfLines={5}
            onChangeText={itemDescription => this.setState({ itemDescription })}
            value={this.state.itemDescription} />
          <TextInput
            style={styles.Text}
            placeholder="Location"
            onChangeText={itemLocation => this.setState({ itemLocation })}
            value={this.state.itemLocation} />
          <Button title="Submit" color="#e93766" onPress={this.handleItems} />
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    MainHeading: {
      fontSize: 30,
      backgroundColor: '#FFFFFF',
      textAlign: 'center'
    },
    SubHeading: {
      fontSize: 17,
      backgroundColor: '#FFFFFF',
      textAlign: 'center',
      padding: 10
    },
    MainContainer: {
      paddingVertical: 30,
      flex: 1,
      alignItems: 'center'
    },
    Text: {
      padding: 10,
      height: 40,
      width: '90%',
      borderColor: 'grey',
      borderWidth: 1,
      marginTop: 8,
      textAlign: 'center',
      fontSize: 16
    },
    textArea: {
      padding: 10,
      width: '90%',
      borderColor: 'grey',
      borderWidth: 1,
      marginTop: 8,
      textAlign: 'center',
      fontSize: 16,
      height: 75,
      justifyContent: "flex-start"
    }
  })
  