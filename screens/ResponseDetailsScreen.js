import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Button } from 'react-native'
import Styles from '../assets/Styles'
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

