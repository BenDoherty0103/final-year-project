import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Button } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import getDirections from 'react-native-google-maps-directions'
import Geocoder from 'react-native-geocoding'


export default class RequestDetails extends React.Component {

    state = {
        items: []
    }

    componentDidMount(props) {
        Geocoder.init("AIzaSyBAzY7hX1PYVw5eU-k24mR7FeK_Uc9P0Sk")
        this.handleGeoLocation()
        db.collection("RequestsList").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const items = querySnapshot.docs.map(doc => doc.data());
                this.setState({ items })
            })
        });
    }

    handleGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLatitude = JSON.stringify(position.coords.latitude)
                const userLongitude = JSON.stringify(position.coords.longitude)
                this.setState({
                    userLatitude,
                    userLongitude
                })
                const lat = parseFloat(this.state.userLatitude)
                const lng = parseFloat(this.state.userLongitude)
                Geocoder.from(lat, lng)
                    .then(json => {
                        var addressComponent = json.results[0].address_components[2];
                        this.setState({ itemLocation: addressComponent.long_name })
                    })
                    .catch(error => console.log(error));
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    handleGetDirections = () => {
        const reqLat = parseFloat(this.state.userLatitude)
        const reqLng = parseFloat(this.state.userLongitude)
        const resLat = parseFloat(this.state.resLat)
        const resLng = parseFloat(this.state.resLong)
        const data = {
            source: {
                latitude: reqLat,
                longitude: reqLng
            },
            destination: {
                latitude: resLat,
                longitude: resLng
            }
        }
        console.log(data.source)
        console.log(data.destination)
        getDirections(data)
    }

    handleOnPress = (props) => {
        items = []
        ids = []
        match = []
        db.collection("RequestsList").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                items.push(doc.data())
                ids.push(doc.id)
            })
            this.setState({ items })
            this.state.items.map((item, i) => {
                if (item.id == this.props.navigation.state.params[0]) {
                    match.push(item, i)
                    item.response.map((responses) => {
                        if (responses.responseID == this.props.navigation.state.params[1]) {
                            resLat = responses.responderLatitude
                            resLong = responses.responderLongitude
                            this.setState({
                                resLat,
                                resLong
                            })
                        }
                    })
                }
            })
            var i = 0;
            for (var id in ids) {
                i++
                if (i == match[1]) {
                    const matchID = ids[i]
                    this.setState({ matchID })
                }
            }
            db.collection("RequestsList").doc(String(this.state.matchID)).update({
                isOpen: false
            })
            this.handleGetDirections()
        })
    }


    render(props) {
        return (
            <View>
                <Text style={Styles.requestMainHeading}>Response Details</Text>
                <View style={Styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                item.response.map((responses) => {
                                    if (responses.responseID == this.props.navigation.state.params[1]) {
                                        return (
                                            <View>
                                                <View style={Styles.listItem}>
                                                    <TouchableOpacity>
                                                        <Text style={Styles.requestsText}>Responding user: {responses.respondingUser}</Text>
                                                        <Text style={Styles.requestsText}>Their offer: {responses.responsebody}</Text>
                                                        <Text style={Styles.requestsText}>Responded at: {responses.respondedAt}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {item.requestingUser == firebase.auth().currentUser.email &&
                                                    <View style={Styles.requestSubmit}>
                                                        <Button
                                                            color="#e93766"
                                                            title='Accept Response'
                                                            onPress={this.handleOnPress} />
                                                    </View>
                                                }
                                            </View>
                                        )
                                    }
                                })
                            )
                        }
                    })}
                </View>
            </View>
        )
    }
}

