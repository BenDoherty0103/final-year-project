import React from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'


export default class Response extends React.Component {

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

    handleOnPress = () => {

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
