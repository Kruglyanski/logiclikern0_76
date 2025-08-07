import React, {FC, useCallback} from 'react';
import {Modal, FlatList, View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {TagItem} from '../tag-item/TagItem';
import {
  ALL_THEMES_TITLE,
  SUPPORTED_ORIENTATIONS,
} from '../../constants/constants';

interface IProps {
  isVisible: boolean;
  tags: readonly string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
  onClose: () => void;
  testID?: string;
}

const keyExtractor = (item: string) => item;

export const SelectorModal: FC<IProps> = ({
  isVisible,
  tags,
  selected,
  onSelect,
  onClose,
  testID,
}) => {
  const data = [ALL_THEMES_TITLE, ...tags];

  const onPress = useCallback(
    (item: string) => {
      onSelect(item === ALL_THEMES_TITLE ? null : item);
      onClose();
    },
    [onSelect, onClose],
  );

  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <TagItem
        testID={testID ? `${testID}-tag-${item}` : undefined}
        isActive={item === selected || (item === ALL_THEMES_TITLE && !selected)}
        {...{onPress, item}}
      />
    ),
    [onPress, selected],
  );

  return (
    <Modal
      testID={testID}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.placeholderView} />
          <Text style={styles.title}>Выбор темы</Text>
          <TouchableOpacity
            testID="selector-modal-close-button"
            onPress={onClose}
            style={styles.closeButton}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            {...{data, keyExtractor, renderItem}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};
