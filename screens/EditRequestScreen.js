import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import Styles from '../assets/Styles'
import { db } from '../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'


export default class EditRequest extends React.Component {

    state = {
        items: [],
        itemName: '',
        itemDescription: '',
        rideshareStartingLocation: '',
        rideshareDestination: '',
        rideshareTime: '',
    }

    componentDidMount() {
        db.collection("RequestsList").get().then((querySnapshot) => {
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
        const ItemName = this.state.itemName
        const ItemDescription = this.state.itemDescription
        const RideshareStartingLocation = this.state.rideshareStartingLocation
        const RideshareDestination = this.state.rideshareDestination
        const RideshareTime = this.state.rideshareTime
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
            if (ItemName != '' && ItemDescription != '') {
                db.collection("RequestsList").doc(String(this.state.matchID)).update({
                    itemName: ItemName,
                    itemDescription: ItemDescription
                })
                this.props.navigation.navigate('Main')
            }
            else if (RideshareStartingLocation != '' && RideshareDestination != '' && RideshareTime != '') {
                db.collection("RequestsList").doc(String(this.state.matchID)).update({
                    rideshareStartingLocation: RideshareStartingLocation,
                    rideshareDestination: RideshareDestination,
                    rideshareTime: RideshareTime,
                })
                this.props.navigation.navigate('Main')
            }
            else {
                this.setState({ errorMessage: 'Please enter a value!' })
            }
        })
    }

    render() {
        return (
            <View style={Styles.requestMainContainer}>
                <Text style={Styles.requestMainHeading}>Your Request</Text>
                <Text style={Styles.requestSubHeading}>Please fill out the fields below, and try to be as descriptive as possible.</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>
                }
                {this.state.items.map((item) => {
                    if (item.id == this.props.navigation.state.params[0]) {
                        if (item.category == 'Commodity' || item.category == 'Experience') {
                            return (
                                <View style={Styles.innerContainer}>
                                    <TextInput
                                        style={Styles.requestTextInput}
                                        placeholder={String('Item name: ' + item.itemName)}
                                        onChangeText={itemName => this.setState({ itemName })}
                                        value={this.state.itemName} />
                                    <TextInput
                                        style={Styles.requestTextInput}
                                        placeholder={String('Item Description: ' + item.itemDescription)}
                                        onChangeText={itemDescription => this.setState({ itemDescription })}
                                        value={this.state.itemDescription} />
                                    <View style={Styles.requestSubmit}>
                                        <Button title='Submit Changes' color="#e93766" onPress={this.handleOnPress}></Button>
                                    </View>
                                </View>
                            )
                        }
                        else if (item.category == 'Rideshare') {
                            return (
                                <View style={Styles.innerContainer}>
                                    <TextInput
                                        style={Styles.requestText}
                                        placeholder={String('Starting Location: ' + item.rideshareStartingLocation)}
                                        onChangeText={rideshareStartingLocation => this.setState({ rideshareStartingLocation })}
                                        value={this.state.rideshareStartingLocation} />
                                    <TextInput
                                        style={Styles.requestText}
                                        placeholder={String('Destination: ' + item.rideshareDestination)}
                                        onChangeText={rideshareDestination => this.setState({ rideshareDestination })}
                                        value={this.state.rideshareDestination} />
                                    <TextInput
                                        style={Styles.requestText}
                                        placeholder={String('Needed at (DD/MM/YY HH:MM): ' + item.rideshareTime)}
                                        onChangeText={rideshareTime => this.setState({ rideshareTime })}
                                        value={this.state.rideshareTime} />
                                    <View style={Styles.requestSubmit}>
                                        <Button title='Submit Changes' color="#e93766" onPress={this.handleOnPress}></Button>
                                    </View>
                                </View>
                            )
                        }
                    }
                })}
            </View>
        )
    }
}