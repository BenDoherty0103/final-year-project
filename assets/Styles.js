import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainHeading: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  innerContainer: {
    padding: 8,
  },
  scroll: {
    padding: 5
  },
  requestMainHeading: {
    fontSize: 30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 5
  },
  requestSubHeading: {
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 5
  },
  requestMainContainer: {
    alignItems: 'center'
  },
  requestText: {
    height: 40,
    width: '90%',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16
  },
  requestTextArea: {
    width: '90%',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    height: 75,
    justifyContent: "flex-start"
  },
  requestSubmit: {
    padding: 10
  },
  requestContainer: {
    flex: 1,
    alignItems: 'center'
  },
  itemsList: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  listItem: {
    paddingVertical: 5,
    width: '90%',
    alignSelf: 'center'
  },
  requestsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  responseTextAreaContainer: {
    alignContent: 'center',
    borderWidth: 1,
    padding: 15
  },
  responseTextArea: {
    borderColor: 'grey',
    height: 150,
    justifyContent: "flex-start"
  },
  image: {
      width: 150,
      height: 125,
      backgroundColor: '#fff',
      alignSelf: 'center'
  },
  helpQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  helpAnswerText: {
    fontSize: 14,
    paddingVertical: 3,
    textAlign: 'center'
  },
});