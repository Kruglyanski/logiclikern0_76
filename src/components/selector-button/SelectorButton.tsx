import React, {FC, memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../constants/Colors';
import {ALL_THEMES_TITLE} from '../../constants/constants';

export const SelectorButton: FC<{
  selectedTag: string | null;
  openModal: () => void;
  testID?: string;
}> = memo(({selectedTag, openModal, testID}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={openModal}
      style={styles.selectorButton}>
      <Text style={styles.selectorButtonText}>
        {selectedTag || ALL_THEMES_TITLE}
      </Text>
      <View style={styles.selectorButtonIcon}>
        <Text>+</Text>
      </View>
    </TouchableOpacity>
  );
});
