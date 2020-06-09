import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import MenuItem from '../components/MenuItem'
import Styles from '../assets/Styles'

export default class MakeNewRequest extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView style={Styles.scroll}>
        <Text style={Styles.mainHeading}>What kind of request would you like to make?</Text>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('NewCommodity')} >
              <MenuItem
                title='Commodity'
                image={require('./../assets/images/list.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('NewExperience')} >
              <MenuItem
                title='Experience'
                image={require('./../assets/images/help.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.mainContainer}>
          <View style={Styles.rowContainer}>
            <TouchableOpacity
              style={Styles.innerContainer}
              onPress={() => this.props.navigation.navigate('NewRideshare')} >
              <MenuItem
                title='Rideshare'
                image={require('./../assets/images/person.jpg')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}