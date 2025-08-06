import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';


export const styles = StyleSheet.create({

  selectorButton: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 28,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 14,
    backgroundColor: Colors.BLACK_20,
  },

  selectorButtonText: {
    fontSize: 12,
    color: Colors.WHITE,
  },

  selectorButtonIcon: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: Colors.BLACK_20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },
});
