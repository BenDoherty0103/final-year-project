import React from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'


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
    }

    handleOnPress = (props) => {
        const ResponseID = uuid.v1().toString()
        items = []
        ids = []
        match = []
        const RequestResponse = this.state.response
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
            if (RequestResponse != '') {
                db.collection("RequestsList").doc(String(this.state.matchID)).update({
                    response: firebase.firestore.FieldValue.arrayUnion(
                        {
                            responseID: ResponseID,
                            respondingUser: firebase.auth().currentUser.email,
                            responsebody: RequestResponse,
                            respondedAt: this.state.respondedAt
                        }
                    )
                })
                this.props.navigation.replace('Main')
            }
            else {
                Alert.alert('Error', 'Please enter a value!')
            }
        })
    }

    render(props) {
        return (
            <View>
                <Text style={styles.textStyle}>Your Response</Text>
                <View style={styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                <View>
                                    <Text style={styles.itemtext}>
                                        Please enter your response to this request.
                                        The requesting user will accept or reject your response.
                                    </Text>
                                    <View style={styles.textAreaContainer} >
                                        <TextInput
                                            style={styles.textArea}
                                            underlineColorAndroid="transparent"
                                            placeholder="Type something"
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
                <Button title='Submit' onPress={this.handleOnPress} />
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
    itemtext: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
})
