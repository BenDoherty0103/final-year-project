import React from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
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
                <Text style={Styles.requestMainHeading}>View Your Responses</Text>
                <Text style={Styles.requestSubHeading}>Below is a list of your responses. Select one to view more in depth details.</Text>
                <View style={Styles.requestsList}>
                    {this.state.items.map((item) => {
                        if (item.response) {
                            return (
                                item.response.map((responses) => {
                                    if (responses.respondingUserEmail == firebase.auth().currentUser.email || item.acceptedResponder == firebase.auth().currentUser.email) {
                                        return (
                                            <View style={Styles.listItem}>
                                                {item.category == 'Rideshare' &&
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResponseDetails', [item.id, responses.responseID])}>
                                                        <Text style={Styles.requestsText}>Response to rideshare</Text>
                                                    </TouchableOpacity>
                                                }
                                                {item.category == 'Commodity' &&
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResponseDetails', [item.id, responses.responseID])}>
                                                        <Text style={Styles.requestsText}>Response to: {item.itemName}</Text>
                                                    </TouchableOpacity>
                                                }
                                                {item.category == 'Experience' &&
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResponseDetails', [item.id, responses.responseID])}>
                                                        <Text style={Styles.requestsText}>Response to: {item.itemName}</Text>
                                                    </TouchableOpacity>
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
