import React, {
  useState,
  useMemo,
  useCallback,
  FC,
  useRef,
  useEffect,
} from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { CourseCard } from '../components/course-card/CourseCard';
import { SelectorModal } from '../components/selector-modal/SelectorModal';
import { styles } from './styles';
import { useApi } from '../hooks/useApi';
import { Colors } from '../constants/Colors';
import { SelectorButton } from '../components/selector-button/SelectorButton';
import { ICourse } from '../interfaces/course';

const keyExtractor = (item: ICourse) => item.id;

export const CoursesScreen: FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { courses, isLoading } = useApi();

  const listRef = useRef<FlatList<ICourse>>(null);

  const filteredCourses = useMemo(() => {
    return selectedTag
      ? courses.filter(c => c.tags.includes(selectedTag))
      : courses;
  }, [courses, selectedTag]);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0 });
  }, [filteredCourses]);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    courses.forEach(c => c.tags.forEach((t: string) => allTags.add(t)));

    return Array.from(allTags);
  }, [courses]);

  const openModal = useCallback(() => setModalVisible(true), []);

  const closeModal = useCallback(() => setModalVisible(false), []);

  const onSelectTag = useCallback(
    (tag: string | null) => setSelectedTag(tag),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ICourse }) => <CourseCard course={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <SelectorButton
          testID="selector-button"
          {...{ selectedTag, openModal }}
        />
      </View>
      <View style={styles.centeredWrapper}>
        {isLoading ? (
          <ActivityIndicator
            testID="activity-indicator"
            size="large"
            color={Colors.GRAY}
          />
        ) : (
          <View style={styles.listWrapper}>
            <FlatList
              testID="flatlist"
              {...{ renderItem, keyExtractor }}
              ref={listRef}
              data={filteredCourses}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        )}
      </View>
      <SelectorModal
        {...{ tags }}
        testID="selector-modal"
        isVisible={modalVisible}
        selected={selectedTag}
        onSelect={onSelectTag}
        onClose={closeModal}
      />
    </View>
  );
};
