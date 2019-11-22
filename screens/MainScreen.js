import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native'
import MenuItem from '../components/MenuItem'
import * as firebase from 'firebase'

export default class Home extends React.Component {
  state = { currentUser: null }
  
componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
  
render() {
    const { currentUser } = this.state
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.MainHeading}>Welcome to Commune {currentUser && currentUser.email}! Please select an option from the menu below.</Text>
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity 
              style={styles.innerContainer}
              onPress={() => this.props.navigation.navigate('MakeNewRequest')} >
              <MenuItem
                title='Make a new request'/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.innerContainer}
              onPress={() => this.props.navigation.navigate('ViewAll')} >
              <MenuItem
                title='View all requests' />
        </TouchableOpacity>
        </View>
      </View>
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
         <TouchableOpacity 
           style={styles.innerContainer}
           onPress={() => this.props.navigation.navigate('YourRequests')} >
           <MenuItem
             title='View your requests'/>
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.innerContainer}
           onPress={() => this.props.navigation.navigate('Community')} >
           <MenuItem
             title='View communities' />
         </TouchableOpacity>
         </View>
      </View>
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
         <TouchableOpacity 
           style={styles.innerContainer}
           onPress={() => this.props.navigation.navigate('Help')} >
           <MenuItem
             title='Help'/>
         </TouchableOpacity>
         </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => firebase.auth().signOut()} >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
    mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  innerContainer: {
    padding: 8,
    backgroundColor: "#ffffff"
  },
  MainHeading: {
    fontSize:20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  scroll: {
    paddingVertical: 30
  }
})
