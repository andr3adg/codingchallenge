import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  categoryContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  categoryText: {
    fontSize: 20,
    color: '#0080ff',
  },
  selectedCategoryContainer: {
    backgroundColor: '#0080ff',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
