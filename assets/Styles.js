import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  //main menu heading size is different to usual main heading size to account for amount of info on
  mainMenuHeading: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  innerContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  scroll: {
    paddingVertical: 30
  },
  mainHeading: {
    fontSize: 30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  subHeading: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  requestContainer: {
    paddingTop: 50
  },
  requestMainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pick: {
    width: 100,
    alignSelf: 'center'
  },
  textInput: {
    padding: 10,
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16
  },
  textStyle: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 45
  },
  container: {
    justifyContent: 'center',
  },
  itemsList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  listItem: {
    paddingVertical: 5,
    padding: 20
  },
  itemInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});