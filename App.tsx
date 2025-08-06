/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView, StyleSheet } from 'react-native';
import { CoursesScreen } from './src/screens/CoursesScreen';
import { Colors } from './src/constants/Colors';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CoursesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.VIOLET
  },
});

export default App;
