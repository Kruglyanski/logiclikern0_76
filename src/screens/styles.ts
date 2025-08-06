import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.VIOLET,
  },

  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },

  centeredWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  listWrapper: {
    height: 210,
    marginTop: -20,
  },

  list: {
    paddingHorizontal: 15,
  },
});
