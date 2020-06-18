import React from 'react'
import { Text, View, Button } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import Geocoder from 'react-native-geocoding'
import getDirections from 'react-native-google-maps-directions'


export default class RequestDetails extends React.Component {

  state = {
    items: []
  }

  componentDidMount(props) {
    Geocoder.init("AIzaSyBAzY7hX1PYVw5eU-k24mR7FeK_Uc9P0Sk")
    db.collection("RequestsList").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      })
      this.state.items.map((item) => {
        if (item.id == this.props.navigation.state.params) {
          Geocoder.from(item.rideshareStartingLocation)
            .then(json => {
              var startingLoc = json.results[0].address_components[1].long_name
              this.setState({ startingLoc })
            })
          Geocoder.from(item.rideshareDestination)
            .then(json => {
              var finishLoc = json.results[0].address_components[1].long_name
              this.setState({ finishLoc })
            })
            .catch(error => console.warn(error))
        }
      })
    })
  }

  handlePreviewRoute = (address) => {
    const startingAddress = address[0]
    const finishAddress = address[1]
    Geocoder.from(startingAddress)
      .then(json => {
        var previewStartingLoc = json.results[0].address_components[6].long_name
        Geocoder.from(previewStartingLoc)
          .then(json => {
            var previewStartingGeo = json.results[0].geometry.location;
            Geocoder.from(finishAddress)
              .then(json => {
                var previewFinishGeo = json.results[0].geometry.location;
                const startLat = parseFloat(previewStartingGeo.lat)
                const startLng = parseFloat(previewStartingGeo.lng)
                const endLat = parseFloat(previewFinishGeo.lat)
                const endLng = parseFloat(previewFinishGeo.lng)
                const data = {
                  source: {
                    latitude: startLat,
                    longitude: startLng
                  },
                  destination: {
                    latitude: endLat,
                    longitude: endLng
                  }
                }
                getDirections(data)
              })
          })
      })
  }

  render(props) {
    const respondingUser = firebase.auth().currentUser.email
    return (
      <View>
        <Text style={Styles.requestMainHeading}>Request Details</Text>
        <View style={Styles.requestsList}>
          {this.state.items.map((item) => {
            if (item.id == this.props.navigation.state.params) {
              const id = item.id
              return (
                <View>
                  {item.category == 'Rideshare' &&
                    <View style={Styles.listItem}>
                      <Text style={Styles.requestsText}>Starting Location: {this.state.startingLoc}</Text>
                      <Text style={Styles.requestsText}>Destination: {this.state.finishLoc}</Text>
                      <Text style={Styles.requestsText}>Time requested: {item.rideshareTime}</Text>
                      {item.isOpen == true &&
                        <Text style={Styles.requestsText}>Status: Open</Text>
                      }
                      {item.isOpen == false &&
                        <Text style={Styles.requestsText}>Status: Closed</Text>
                      }
                      {item.requestingUser != firebase.auth().currentUser.email &&
                        <View style={Styles.requestSubmit}>
                          <Button
                            color="#e93766"
                            title='Preview Route'
                            onPress={() => this.handlePreviewRoute([item.rideshareStartingLocation, item.rideshareDestination])} />
                        </View>
                      }
                    </View>
                  }
                  {item.category == 'Commodity' &&
                    <View style={Styles.listItem}>
                      <Text style={Styles.requestsText}>Item Name: {item.itemName}</Text>
                      <Text style={Styles.requestsText}>Item Description: {item.itemDescription}</Text>
                      <Text style={Styles.requestsText}>Item Location: {item.itemLocation}</Text>
                      <Text style={Styles.requestsText}>Category: {item.category}</Text>
                      <Text style={Styles.requestsText}>Requested At: {item.requestedAt}</Text>
                      {item.isOpen == true &&
                        <Text style={Styles.requestsText}>Status: Open</Text>
                      }
                      {item.isOpen == false &&
                        <Text style={Styles.requestsText}>Status: Closed</Text>
                      }
                    </View>
                  }
                  {item.category == 'Experience' &&
                    <View style={Styles.listItem}>
                      <Text style={Styles.requestsText}>Item Name: {item.itemName}</Text>
                      <Text style={Styles.requestsText}>Item Description: {item.itemDescription}</Text>
                      <Text style={Styles.requestsText}>Item Location: {item.itemLocation}</Text>
                      <Text style={Styles.requestsText}>Category: {item.category}</Text>
                      <Text style={Styles.requestsText}>Requested At: {item.requestedAt}</Text>
                      {item.isOpen == true &&
                        <Text style={Styles.requestsText}>Status: Open</Text>
                      }
                      {item.isOpen == false &&
                        <Text style={Styles.requestsText}>Status: Closed</Text>
                      }
                    </View>
                  }
                  {item.requestingUser == firebase.auth().currentUser.email &&
                    <View style={Styles.requestSubmit}>
                      <Button
                        color="#e93766"
                        title='View responses'
                        onPress={() => this.props.navigation.navigate('Responses', id)} />
                    </View>
                  }
                  {item.requestingUser == firebase.auth().currentUser.email &&
                    <View style={Styles.requestSubmit}>
                      <Button
                        color="#e93766"
                        title='Edit'
                        onPress={() => this.props.navigation.navigate('Edit', [id, item.requestingUser, respondingUser])} />
                    </View>
                  }
                  {item.requestingUser != firebase.auth().currentUser.email &&
                    <View style={Styles.requestSubmit}>
                      <Button
                        color="#e93766"
                        title='Respond'
                        onPress={() => this.props.navigation.navigate('Response', [id, item.requestingUser, respondingUser])} />
                    </View>
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

