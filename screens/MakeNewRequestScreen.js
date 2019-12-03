import React from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'

export default class MakeNewRequest extends React.Component {
  
  state = { itemName: '', itemDescription: '', itemLocation: '' }
  
  
  handleItems = () => {   
        const { itemName, itemDescription, itemLocation } = this.state
        db.ref('RequestsList/').push({
        itemName,
        itemDescription,
        itemLocation
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }
  
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.MainHeading}>Make a new request</Text>
        <Text style={styles.SubHeading}>Please fill out the fields below.</Text>
        <TextInput
          placeholder="Item Name"
          onChangeText={itemName => this.setState({ itemName })}
          value={this.state.itemName} />
        <TextInput
          placeholder="Item Description"
          onChangeText={itemDescription => this.setState({ itemDescription })}
          value={this.state.itemDescription}/>
        <TextInput
          placeholder="Item Location"
          onChangeText={itemLocation => this.setState({ itemLocation })}
          value={this.state.itemLocation}/>
        <Button title="Submit" onPress={this.handleItems}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainHeading: {
    fontSize:30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  SubHeading: {
    fontSize:20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  MainContainer: {
    paddingVertical: 30
  }
})