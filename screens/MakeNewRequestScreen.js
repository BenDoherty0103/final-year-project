import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Picker,
} from 'react-native'
import { db } from './../configs/firebaseConfig'
import uuid from 'react-native-uuid'

export default class MakeNewRequest extends React.Component {
  
  state = { itemName: '', itemDescription: '', itemLocation: '', requestedBy: '', requestedAt: '', category: '', id: '', isOpen: true}
  
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
    const { itemName, itemDescription, itemLocation, requestedAt, isOpen } = this.state
    db.collection('RequestsList').add({
      itemName,
      itemDescription,
      itemLocation,
      requestedAt,
      id,
      isOpen
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
        this.props.navigation.replace('Main')
  }
  
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.MainHeading}>Make a new request</Text>
        <Text style={styles.SubHeading}>Please fill out the fields below.</Text>
        <TextInput
          style={styles.Text}
          placeholder="Item Name"
          onChangeText={itemName => this.setState({ itemName })}
          value={this.state.itemName} />
        <TextInput
          style={styles.Text}
          placeholder="Item Description"
          onChangeText={itemDescription => this.setState({ itemDescription })}
          value={this.state.itemDescription}/>
        <TextInput
          style={styles.Text}
          placeholder="Item Location"
          onChangeText={itemLocation => this.setState({ itemLocation })}
          value={this.state.itemLocation}/>
        <Picker 
          style={{
            width: 100,
          }}
          selectedValue={(this.state && this.state.pickerValue) || 'Commodity'}
          onValueChange={(value) => {
            this.setState({value})
          }}>
          <Picker.Item label={'Commodity'} value={'Commodity'} />
          <Picker.Item label={'Experience'} value={'Experience'} />
          <Picker.Item label={'Rideshare'} value={'Rideshare'} />
        </Picker>
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
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
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