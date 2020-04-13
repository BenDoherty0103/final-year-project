import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { db } from './../configs/firebaseConfig'
import Styles from '../assets/Styles'

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
        <Text style={Styles.mainHeading}>View Requests</Text>
        <View style={Styles.itemsList}>
          {this.state.items.map((item) => {
            return (
              <View style={Styles.listItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                  <Text style={Styles.itemInfo}>Item Name: {item.itemName}</Text>
                  <Text style={Styles.itemInfo}>Item Location: {item.itemLocation}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
