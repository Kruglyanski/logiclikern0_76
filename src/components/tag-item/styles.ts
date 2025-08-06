import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  tagItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    marginVertical: 4,
    borderRadius: 12,
    borderColor: Colors.LIGHT_BLUE,
  },

  active: {
    backgroundColor: Colors.GREEN,
  },

  text: {
    fontSize: 18,
  },

  activeText: {
    color: Colors.WHITE,
  },
});
