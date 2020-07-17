import React from 'react'
import { Text, View, Button } from 'react-native'
import Styles from '../assets/Styles'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'
import Geocoder from 'react-native-geocoding'


export default class Response extends React.Component {

    state = {
        items: [],
        response: ''
    }

    componentDidMount(props) {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        this.setState({
            //Setting the value of the date time
            respondedAt:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min,
        });
        db.collection("RequestsList").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const items = querySnapshot.docs.map(doc => doc.data());
                this.setState({ items })
            })
        });
        db.collection("Users").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const users = querySnapshot.docs.map(doc => doc.data());
                this.setState({ users })
            });
            this.state.users.map((user) => {
                if (firebase.auth().currentUser.email == user.email) {
                    this.setState({ userResponding: user.fullName })
                    this.setState({ userRespondingID: user.userID })
                    this.setState({ userRespondingLocation: user.location })
                }
            })
        })
    }

    handleOnPress = (props) => {
        const responderEmail = firebase.auth().currentUser.email
        const ResponseID = uuid.v1().toString()
        items = []
        ids = []
        match = []
        const RequestResponse = this.state.response
        Geocoder.from(this.state.userRespondingLocation)
            .then(json => {
                var location = json.results[0].geometry.location;
                this.setState({ resLat: location.lat })
                this.setState({ resLng: location.lng })
                console.log(this.state.resLat)
                console.log(this.state.resLng)
                db.collection("RequestsList").get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        items.push(doc.data())
                        ids.push(doc.id)
                    })
                    this.setState({ items })
                    this.state.items.map((item, i) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            const matchIndex = i
                            const matchID = ids[matchIndex]
                            if (RequestResponse != '') {
                                db.collection("RequestsList").doc(String(matchID)).update({
                                    response: firebase.firestore.FieldValue.arrayUnion(
                                        {
                                            responseID: ResponseID,
                                            respondingUser: this.state.userResponding,
                                            respondingUserEmail: responderEmail,
                                            responsebody: RequestResponse,
                                            respondedAt: this.state.respondedAt,
                                            responderLatitude: this.state.resLat,
                                            responderLongitude: this.state.resLng
                                        }
                                    )
                                })
                                .then(() => this.props.navigation.navigate('Main'))
                                .catch(error => this.setState({ errorMessage: error.message }))
                            }
                            else {
                                this.setState({ errorMessage: 'Please enter a value!' })
                            }
                        }
                    })
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render(props) {
        return (
            <View>
                <Text style={Styles.requestMainHeading}>Your Response</Text>
                <View style={Styles.requestsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                <View>
                                    <Text style={Styles.requestSubHeading}>
                                        Please enter your response to this request.
                                        The requesting user will accept or reject your response.
                                    </Text>
                                    {this.state.errorMessage &&
                                        <Text style={{ color: 'red' }}>
                                            {this.state.errorMessage}
                                        </Text>
                                    }
                                    <View style={Styles.responseTextAreaContainer} >
                                        <TextInput
                                            style={Styles.responseTextArea}
                                            underlineColorAndroid="transparent"
                                            placeholder="Type your response here"
                                            placeholderTextColor="grey"
                                            numberOfLines={10}
                                            multiline={true}
                                            onChangeText={response => this.setState({ response })}
                                            value={this.state.response}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
                <View style={Styles.requestSubmit}>
                    <Button title="Submit" color="#e93766" onPress={this.handleOnPress} />
                </View>
            </View>
        )
    }
}

