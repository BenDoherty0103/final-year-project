import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Button } from 'react-native'
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
        this.props.navigation.replace('Main')
    }


    render(props) {
        return (
            <View>
                <Text style={styles.textStyle}>Response Details</Text>
                <View style={styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                item.response.map((responses) => {
                                    if (responses.responseID == this.props.navigation.state.params[1]) {
                                        return (
                                            <View>
                                                <View style={styles.listItem}>
                                                    <TouchableOpacity>
                                                        <Text style={styles.itemtext}>{responses.respondingUser}</Text>
                                                        <Text style={styles.itemtext}>{responses.responsebody}</Text>
                                                        <Text style={styles.itemtext}>{responses.respondedAt}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {item.requestingUser == firebase.auth().currentUser.email &&
                                                    <Button
                                                        title='Accept Response'
                                                        onPress={this.handleOnPress} />
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
