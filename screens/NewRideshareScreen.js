import React from 'react'
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Button,
    Picker,
} from 'react-native'
import Styles from '../assets/Styles'
import { db } from './../configs/firebaseConfig'
import * as firebase from 'firebase'
import uuid from 'react-native-uuid'

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
    }

    handleItems = () => {
        const id = uuid.v1().toString()
        const requestingUser = firebase.auth().currentUser.email
        const category = 'Rideshare'
        const { rideshareStartingLocation, rideshareDestination, rideshareTime, requestedAt, isOpen } = this.state
        db.collection('RequestsList').add({
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
    }

    render() {

        return (
            <View style={styles.MainContainer}>
                <Text style={styles.MainHeading}>New rideshare request</Text>
                <Text style={styles.SubHeading}>Please fill out the fields below, and please put the time you need the rideshare at in 24hr format.</Text>
                <TextInput
                    style={styles.Text}
                    placeholder="Starting Location"
                    onChangeText={rideshareStartingLocation => this.setState({ rideshareStartingLocation })}
                    value={this.state.rideshareStartingLocation} />
                <TextInput
                    style={styles.Text}
                    placeholder="Destination"
                    onChangeText={rideshareDestination => this.setState({ rideshareDestination })}
                    value={this.state.rideshareDestination} />
                <TextInput
                    style={styles.Text}
                    placeholder="Needed at (DD/MM/YY HH:MM)"
                    onChangeText={rideshareTime => this.setState({ rideshareTime })}
                    value={this.state.rideshareTime} />
                <Button title="Submit" color="#e93766" onPress={this.handleItems} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainHeading: {
        fontSize: 30,
        backgroundColor: '#FFFFFF',
        textAlign: 'center'
    },
    SubHeading: {
        fontSize: 17,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        padding: 10
    },
    MainContainer: {
        paddingVertical: 30,
        flex: 1,
        alignItems: 'center'
    },
    Text: {
        padding: 10,
        height: 40,
        width: '90%',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        textAlign: 'center',
        fontSize: 16
    }
})
