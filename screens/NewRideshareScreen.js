import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'
import Geocoder from 'react-native-geocoding'

export default class NewRideshare extends React.Component {

    state = {
        rideshareStartingLocation: '',
        rideshareDestination: '',
        rideshareTime: '',
        requestedBy: '',
        requestedAt: '',
        category: '',
        id: '',
        isOpen: true
    }

    componentDidMount() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        this.setState({
            //Setting the value of the date time
            requestedAt:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min,
        });
        this.handleGeolocation()
    }

    handleGeolocation = () => {
        db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                const users = querySnapshot.docs.map(doc => doc.data());
                users.map((user) => {
                    if (user.email == firebase.auth().currentUser.email) {
                        this.setState({ community: user.town })
                    }
                })
                this.setState({ users })
            })
        }).catch(error => console.warn(error));
    }

    handleItems = () => {
        Geocoder.init("AIzaSyBAzY7hX1PYVw5eU-k24mR7FeK_Uc9P0Sk")
        Geocoder.from(this.state.rideshareStartingLocation)
            .then(json => {
                var loc = json.results[0].geometry.location;
                const startLatitude = String(loc.lat)
                const startLongitude = String(loc.lng)
                this.setState({ startLatitude })
                this.setState({ startLongitude })
                Geocoder.from(this.state.rideshareDestination)
                    .then(json => {
                        var loc = json.results[0].geometry.location;
                        const finishLatitude = String(loc.lat)
                        const finishLongitude = String(loc.lng)
                        this.setState({ finishLatitude })
                        this.setState({ finishLongitude })
                        const { community, rideshareStartingLocation, rideshareDestination, rideshareTime, requestedAt, isOpen } = this.state
                        const id = uuid.v1().toString()
                        const requestingUser = firebase.auth().currentUser.email
                        const category = 'Rideshare'
                        db.collection('RequestsList').add({
                            community,
                            rideshareStartingLocation,
                            rideshareDestination,
                            rideshareTime,
                            requestedAt,
                            id,
                            isOpen,
                            requestingUser,
                            category
                        }).catch((error) => {
                            //error callback
                            console.log('error ', error)
                        })
                        this.props.navigation.replace('Main')
                    })
            })
    }

    render() {
        return (
            <View style={Styles.requestMainContainer}>
                <Text style={Styles.requestMainHeading}>New rideshare request</Text>
                <Text style={Styles.requestSubHeading}>Please fill out the full address of each location (including postcodes) and the time you need the rideshare (in 24hr format).</Text>
                <TextInput
                    style={Styles.requestText}
                    placeholder="Starting Location"
                    onChangeText={rideshareStartingLocation => this.setState({ rideshareStartingLocation })}
                    value={this.state.rideshareStartingLocation} />
                <TextInput
                    style={Styles.requestText}
                    placeholder="Destination"
                    onChangeText={rideshareDestination => this.setState({ rideshareDestination })}
                    value={this.state.rideshareDestination} />
                <TextInput
                    style={Styles.requestText}
                    placeholder="Needed at (DD/MM/YY HH:MM)"
                    onChangeText={rideshareTime => this.setState({ rideshareTime })}
                    value={this.state.rideshareTime} />
                <View style={Styles.requestSubmit}>
                    <Button title="Submit" color="#e93766" onPress={this.handleItems} />
                </View>
            </View>
        )
    }
}
