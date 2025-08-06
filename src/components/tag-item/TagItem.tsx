import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const TagItem = React.memo<{
  item: string;
  isActive: boolean;
  onPress: (item: string) => void;
  testID?: string;
}>(({ item, isActive, onPress, testID }) => {
  const handlePress = useCallback(() => onPress(item), [item, onPress]);
console.log('testId item', testID)
  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.tagItem, isActive && styles.active]}
      onPress={handlePress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{item}</Text>
    </TouchableOpacity>
  );
});
