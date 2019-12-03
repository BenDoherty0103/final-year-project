import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import MenuItem from '../components/MenuItem'
import * as firebase from 'firebase'

export default class Home extends React.Component {
  //Default user profile object is empty, to be filled in from sign in information
  state = { currentUser: null }
  
  //Assigning user information to state object
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
  
render() {
  const { currentUser } = this.state

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.mainHeading}>Welcome to Commune! Please select an option from the menu below.</Text>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity 
            style={styles.innerContainer}
            onPress={() => this.props.navigation.navigate('MakeNewRequest')} >
            <MenuItem
              title='Make a new request'
              image={require('./../assets/images/add.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.innerContainer}
            onPress={() => this.props.navigation.navigate('ViewAll')} >
            <MenuItem
              title='View all requests'
              image={require('./../assets/images/list.jpg')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity 
            style={styles.innerContainer}
            onPress={() => this.props.navigation.navigate('YourRequests')} >
            <MenuItem
              title='View your requests'
              image={require('./../assets/images/person.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.innerContainer}
            onPress={() => this.props.navigation.navigate('Community')} >
            <MenuItem
              title='View communities'
              image={require('./../assets/images/community.jpg')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity 
            style={styles.innerContainer}
            onPress={() => this.props.navigation.navigate('Help')} >
            <MenuItem
              title='Help'
              image={require('./../assets/images/help.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.innerContainer}
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
const styles = StyleSheet.create({
  mainHeading: {
    fontSize:20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 30
  },
  innerContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  scroll: {
    paddingVertical: 30
  }
})
