import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',
    width: 210,
    height: 210,
    marginHorizontal: 9,
    borderRadius: 24,
  },

  image: {
    height: 144,
    resizeMode: 'contain',
  },

  fakeShadow: {
    paddingBottom: 6,
    backgroundColor: Colors.GRAY,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
  },

  textWrapper: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
  },

  text: {
    fontSize: 14,
    color: Colors.TEXT_2,
  },
});
