import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { db } from './../configs/firebaseConfig'
import Styles from '../assets/Styles'

export default class Community extends React.Component {

  state = {
    items: [],
    communities: []
  }

  componentDidMount() {
    allTowns = []
    db.collection("RequestsList").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      });
      this.state.items.map((item) => {
        allTowns.push(item.community)
        townsSet = new Set(allTowns)
        townsArray = [...townsSet]
        this.setState({ communities: townsArray })
      })
    });
  }

  render() {
    return (
      <View style={Styles.requestMainContainer}>
        <Text style={Styles.requestMainHeading}>Communities</Text>
        <Text style={Styles.requestSubHeading}>
          Below is a list of all active commmunities, as new towns become active then they will be listed here.
          If you select a community, you can see how many requests and users are active in it.
        </Text>
        <View style={Styles.requestsList}>
          {this.state.communities.map((community) => {
            return (
              <View style={Styles.listItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunityDetails', community)}>
                  <Text style={Styles.requestsText}>{community}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}