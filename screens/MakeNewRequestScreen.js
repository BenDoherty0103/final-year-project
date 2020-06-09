import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import MenuItem from '../components/MenuItem'
import Styles from '../assets/Styles'

export default class MakeNewRequest extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView style={Styles.scroll}>
        <Text style={Styles.mainMenuHeading}>What kind of request would you like to make?</Text>
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

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 45
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#B6A6BB',
  },
  itemsList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  listItem: {
    paddingVertical: 5
  },
  itemtext: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})