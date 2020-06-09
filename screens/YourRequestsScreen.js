import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'

export default class ViewAll extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    db.collection("RequestsList").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      });
    });
  }

  render() {
    return (
      <View style={Styles.requestContainer}>
        <Text style={Styles.requestMainHeading}>View Your Requests</Text>
        <Text style={Styles.requestSubHeading}>Below is a list of your requests, sorted by their title. Rideshare requests will simply have the title 'Rideshare'.</Text>
        <View style={Styles.requestsList}>
          {this.state.items.map((item) => {
            if (item.requestingUser == firebase.auth().currentUser.email) {
              return (
                <View style={Styles.listItem}>
                  {item.category == 'Rideshare' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={Styles.requestsText}>Rideshare</Text>
                    </TouchableOpacity>
                  }
                  {item.category == 'Commodity' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={Styles.requestsText}>{item.itemName}</Text>
                    </TouchableOpacity>
                  }
                  {item.category == 'Experience' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={Styles.requestsText}>{item.itemName}</Text>
                    </TouchableOpacity>
                  }
                </View>
              )
            }
          })}
        </View>
      </View>
    )
  }
}
