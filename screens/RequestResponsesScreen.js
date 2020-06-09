import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { db } from './../configs/firebaseConfig'
import Styles from '../assets/Styles'

export default class RequestResponsesScreen extends React.Component {

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
        return (
            <View style={Styles.requestContainer}>
                <Text style={Styles.requestMainHeading}>Request Responses</Text>
                <View style={Styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params) {
                            if (item.response) {
                                return (
                                    item.response.map((responses) => {
                                        return (
                                            <View>
                                                <View style={Styles.listItem}>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResponseDetails', [item.id, responses.responseID])}>
                                                        <Text style={Styles.requestsText}>Response from: {responses.respondingUser}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })
                                )
                            }
                            else {
                                return (
                                    <View style={Styles.listItem}>
                                        <Image
                                            style={Styles.image}
                                            resizeMode={"contain"}
                                            source={require('./../assets/images/help.jpg')} />
                                        <Text style={Styles.requestsText}>No responses yet, check back later!</Text>
                                    </View>
                                )
                            }
                        }
                    })}
                </View>
            </View>
        )
    }
}
