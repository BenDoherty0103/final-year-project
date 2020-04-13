import React from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'


export default class RequestDetails extends React.Component {

  state = {
    items: []
  }

  componentDidMount(props) {
    db.collection("RequestsList").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      })
    });
  }

  render(props) {
    const respondingUser = firebase.auth().currentUser.email
    return (
      <View>
        <Text style={styles.textStyle}>Request Details</Text>
        <View style={styles.itemsList}>
          {this.state.items.map((item) => {
            if (item.id == this.props.navigation.state.params) {
              const id = item.id
              console.log(id)
              return (
                <View>
                  <View style={styles.listItem}>
                    <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                    <Text style={styles.itemtext}>Item Description: {item.itemDescription}</Text>
                    <Text style={styles.itemtext}>Item Location: {item.itemLocation}</Text>
                    <Text style={styles.itemtext}>Requested At: {item.requestedAt}</Text>
                  </View>
                  {item.requestingUser == firebase.auth().currentUser.email &&
                    <Button 
                    title='Respond' 
                    onPress={() => this.props.navigation.navigate('Response', [id, item.requestingUser, respondingUser])} />
                  }
                  {item.requestingUser != firebase.auth().currentUser.email &&
                    <Button 
                    title='Edit' 
                    onPress={() => this.props.navigation.navigate('Edit', [id, item.requestingUser, respondingUser])} />
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
