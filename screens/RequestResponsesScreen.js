import React from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import { db } from './../configs/firebaseConfig'


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
            <View>
                <Text style={styles.textStyle}>Request Responses</Text>
                <View style={styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params) {
                            return (
                                item.response.map((responses) => {
                                    return (
                                        <View>
                                            <View style={styles.listItem}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResponseDetails', [item.id, responses.responseID])}>
                                                    <Text style={styles.itemtext}>{responses.responsebody}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
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
