import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import MenuItem from '../components/MenuItem'
import * as firebase from 'firebase'
import Styles from '../assets/Styles'

export default class Home extends React.Component {
  //Default user profile object is empty, to be filled in from sign in information
  state = { currentUser: null }

  //Assigning user information to state object
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login')
    })
  }

  render() {
    return (
      <ScrollView style={Styles.scroll}>
        <Text style={Styles.mainHeading}>Welcome! Please select an option from the menu below.</Text>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('MakeNewRequest')} >
              <MenuItem
                title='Make a new request'
                image={require('./../assets/images/add.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('ViewAll')} >
              <MenuItem
                title='View all requests'
                image={require('./../assets/images/list.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('YourProfile')} >
              <MenuItem
                title='View your profile'
                image={require('./../assets/images/person.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('Community')} >
              <MenuItem
                title='View communities'
                image={require('./../assets/images/community.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('Help')} >
              <MenuItem
                title='Help'
                image={require('./../assets/images/help.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => firebase.auth().signOut()} >
              <MenuItem
                title='Sign Out'
                image={require('./../assets/images/signout.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
