import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  title: {
    fontSize: 18,
  },

  closeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },

  placeholderView: {
    flex: 1,
  },

  listContainer: {
    width: '50%',
    paddingBottom: 60,
  },
});
