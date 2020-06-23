import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { db } from './../configs/firebaseConfig'
import MenuItem from '../components/MenuItem'
import Styles from '../assets/Styles'


export default class YourProfile extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const users = querySnapshot.docs.map(doc => doc.data());
        this.setState({ users })
      });
    });
  }

  render() {
    return (
      <ScrollView style={Styles.scroll}>
        <Text style={Styles.mainHeading}>Please select an option from the menu below.</Text>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('YourRequests')} >
              <MenuItem
                title='View your requests'
                image={require('./../assets/images/list.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('YourDetails')} >
              <MenuItem
                title='View/change your details'
                image={require('./../assets/images/person.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('YourResponses')} >
              <MenuItem
                title='View your responses'
                image={require('./../assets/images/community.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}