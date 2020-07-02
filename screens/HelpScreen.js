import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import Styles from '../assets/Styles'


export default class Help extends React.Component {


  render() {
    return (
      <ScrollView>
        <Text style={Styles.requestMainHeading}>FAQs</Text>
        <Text style={Styles.requestSubHeading}>If you require further assistance please email doherty-b21@ulster.ac.uk</Text>
        <View style={Styles.requestsList}>
          <View style={Styles.listItem}>
            <Text style={Styles.helpQuestionText}>1. What are the different types of request?</Text>
            <Text style={Styles.helpAnswerText}>A request in the 'Commodity' category is any item that you may need that can be traded or used eg. a lawnmower.</Text>
            <Text style={Styles.helpAnswerText}>A request in the 'Experience' category is any request for professional assistance eg. a plumber or painter.</Text>
            <Text style={Styles.helpAnswerText}>A request in the 'Rideshare' category is any request for a lift from your home location (as stored in your user profile) to a location of your choice. </Text>
          </View>
          <View style={Styles.listItem}>
            <Text style={Styles.helpQuestionText}>2. How do I know if I have any responses to my request?</Text>
            <Text style={Styles.helpAnswerText}>If you look at your request through the 'View your requests' screen, you can view the responses via the details of your request.</Text>
          </View>
          <View style={Styles.listItem}>
            <Text style={Styles.helpQuestionText}>3. How do I know if my response has been accepted?</Text>
            <Text style={Styles.helpAnswerText}>If you look at your response through the 'View your responses' screen, you can view the status of your response and see if it has been accepted.</Text>
          </View>
          <View style={Styles.listItem}>
            <Text style={Styles.helpQuestionText}>4. Do I need to have Google Maps installed?</Text>
            <Text style={Styles.helpAnswerText}>No. If you don't have google Maps installed, you will be redirected to Google Maps in your default browser.</Text>
          </View>
          <View style={Styles.listItem}>
            <Text style={Styles.helpQuestionText}>5. Why am I asked for my location?</Text>
            <Text style={Styles.helpAnswerText}>Your location is the main attribute of any request you make. By using your location, your request can be responded to by people in your area, making sure you don't have to go out of your way.</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

