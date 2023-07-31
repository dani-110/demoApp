import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  button: {
    width: 20,
    height: 20,
    // backgroundColor:'green',
  },
  topHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: 20,
    height: 40,
  },
  topHeaderSearch: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 8,
  },
  advanceSearch: {
    marginLeft: 8,
    height: 20,
    width: 50,
  },
  searchPanel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    width: 250,
  },
  select: {
    width: 250,
  },
  popup: {
    margin: 16,
    width: 300,
  },
  popupTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popupInput: {paddingTop: 16},
  rightHeader: {
    // flexGrow: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    // flexDirection: 'row-reverse',
  },
  rightHeaderButton: {
    marginLeft: 8,
    fontWeight: 700,
    fontSize: 14,
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  syncLight: {
    marginLeft: 16,
    width: 130,
    fontWeight: 700,
    fontSize: 14,
    backgroundColor: '#718096',
  },
  row: {
    width: '50%',
    flexDirection: 'row',
    borderColor: 'white',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    padding: 16,
    alignItems: 'center',
    // flexWrap: "wrap"
  },
  rowFull: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  rowName: {
    marginHorizontal: 8,
    width: '40%',
    alignItems: 'center',
  },
  rowValue: {width: '60%', color: '#aaa', alignItems: 'center'},
  evenRow: {
    backgroundColor: '#eee',
  },
  evenOdd: {},

  reference: {
    backgroundColor: 'skyblue',
    marginHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  cardHeading: {
    margin: 16,
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  previewImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  rowAnswer: {
    width: '20%',
    alignItems: 'center',
  },
  rowQuestion: {
    width: '80%',
  },
  rowProduct: {
    width: '50%',
  },
  rowProductApprove: {
    // paddingHorizontal: 20,
    // width: "16.6%",
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  insightTab: {
    flexDirection: 'row',
  },
  insightButton: {
    flex: 1,
    borderRadius: 0,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  header: {
    flexDirection: 'row',
  },

  //model
  model_container: {
    borderRadius: 4,
    padding: 16,
    width: 320,
  },
  model_description: {
    marginTop: 8,
    marginBottom: 24,
  },
  model_backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  model_header: {
    marginBottom: 16,
  },
  model_footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  model_button: {
    width: 100,
  },
});
