import React from 'react'
import { Text, View, Button } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from '../configs/firebaseConfig'

export default class RequestDetails extends React.Component {

  state = {
    items: [],
    communities: []
  }

  componentDidMount(props) {
    allTowns = []
    var itemsCount = 0
    var usersCount = 0
    db.collection("RequestsList").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      })
      this.state.items.map((item) => {
        allTowns.push(item.community)
        townsSet = new Set(allTowns)
        townsArray = [...townsSet]
        this.setState({ communities: townsArray })
        if (item.community == this.props.navigation.state.params) {
          itemsCount = itemsCount + 1
        }
        this.setState({ itemsCount })
      })
    })
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        const users = querySnapshot.docs.map(doc => doc.data());
        this.setState({ users })
      })
      this.state.users.map((user) => {
        if (user.communitiesFollowing) {
          user.communitiesFollowing.map((community) => {
            if (community.name == this.props.navigation.state.params) {
              usersCount = usersCount + 1
            }
            this.setState({ usersCount })
          })
        }
      })
    })
  }

  handleOnPress = (props) => {
    users = []
    ids = []
    match = []
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        users.push(doc.data())
        ids.push(doc.id)
      })
      this.setState({ users })
      this.state.users.map((user, i) => {
        if (firebase.auth().currentUser.email == user.email) {
          const matchIndex = i
          const matchID = ids[matchIndex]
          db.collection("Users").doc(String(matchID)).update({
            communitiesFollowing: firebase.firestore.FieldValue.arrayUnion(
              {
                name: this.props.navigation.state.params,
              }
            )
          })
          this.props.navigation.replace('Main')
        }
        else {
          this.setState({ errorMessage: 'Failed to join community' })
        }
      })
    })
  }


  render(props) {
    return (
      <View>
        <Text style={Styles.requestMainHeading}>Community Details</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <View style={Styles.requestsList}>
          {this.state.communities.map((community) => {
            if (community == this.props.navigation.state.params) {
              return (
                <View style={Styles.listItem}>
                  <Text style={Styles.requestsText}>The selected community is: {community}</Text>
                  <Text style={Styles.requestsText}>Number of requests in this community: {this.state.itemsCount}</Text>
                  <Text style={Styles.requestsText}>Number of users in this community: {this.state.usersCount}</Text>
                </View>
              )
            }
          })}
        </View>
        <View style={Styles.requestSubmit}>
          <Button title="Join Community" color="#e93766" onPress={this.handleOnPress} />
        </View>
      </View>
    )
  }
}

