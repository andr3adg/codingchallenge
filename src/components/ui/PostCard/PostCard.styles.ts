import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '25%',
    marginRight: 10,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  createdText: {
    textAlign: 'right',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallMarginBottom: {
    marginBottom: 5,
  },
});
