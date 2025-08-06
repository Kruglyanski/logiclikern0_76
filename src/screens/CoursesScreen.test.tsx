import React from 'react';
// render — рендерит React компонент в виртуальное тестовое окружение.
// fireEvent — симулирует пользовательские события (нажатия, ввод и т.п.).
// waitFor — ждет выполнения асинхронных изменений в UI (например, ререндер после setState).
// act — оборачивает действия, которые вызывают обновления React, чтобы тесты были более надежными.
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

// Импортируем сам компонент, который тестируем
import { CoursesScreen } from './CoursesScreen';

// Мокаем хук useApi как jest.fn() — теперь он может принимать .mockReturnValue
jest.mock('../hooks/useApi', () => ({
  useApi: jest.fn(),
}));

// Импорт мок-функции useApi — важно импортировать ПОСЛЕ вызова jest.mock!
import { useApi as mockedUseApi } from '../hooks/useApi';

// Мокаем компонент CourseCard, упрощаем до простого View
jest.mock('../components/course-card/CourseCard', () => ({
  CourseCard: ({ course }: { course: { id: string } }) => {
    const { View } = require('react-native');
    return <View testID={`course-card-${course.id}`} />;
  },
}));

// Мокаем SelectorButton (кнопку открытия модалки)
jest.mock('../components/selector-button/SelectorButton', () => ({
  SelectorButton: ({ selectedTag, openModal }: any) => {
    const { Pressable, Text } = require('react-native');
    return (
      <Pressable testID={'selector-button'} onPress={openModal}>
        <Text>{selectedTag || 'All themes'}</Text>
      </Pressable>
    );
  },
}));

// Мокаем SelectorModal, добавляя кнопки для выбора тега и закрытия
jest.mock('../components/selector-modal/SelectorModal', () => ({
  SelectorModal: ({ isVisible, onSelect, onClose, testID }: any) => {
    const { View, Pressable } = require('react-native');
    if (!isVisible) return null;

    return (
      <View testID={testID || 'selector-modal'}>
        <Pressable
          testID="tag-js"
          onPress={() => onSelect && onSelect('js')}
          accessible
        />
        <Pressable
          testID="close-modal"
          onPress={() => onClose && onClose()}
          accessible
        />
      </View>
    );
  },
}));

// Тестовые данные
const mockCourses = [
  { id: '1', tags: ['js', 'react'], title: 'Course 1' },
  { id: '2', tags: ['ts'], title: 'Course 2' },
  { id: '3', tags: ['js'], title: 'Course 3' },
];

describe('CoursesScreen', () => {
  // Перед каждым тестом задаем return value мокнутой useApi
  beforeEach(() => {
    (mockedUseApi as jest.Mock).mockReturnValue({
      courses: mockCourses,
      isLoading: false,
    });
  });

  it('рендерит SelectorButton с selectedTag по умолчанию (null)', () => {
    const { getByText } = render(<CoursesScreen />);
    expect(getByText('All themes')).toBeTruthy();
  });

  it('показывает ActivityIndicator при загрузке данных', async () => {
    (mockedUseApi as jest.Mock).mockReturnValue({
      courses: [],
      isLoading: true,
    });

    const { getByTestId, queryByTestId } = render(<CoursesScreen />);

    await waitFor(() => {
      expect(getByTestId('activity-indicator')).toBeTruthy();
      expect(queryByTestId('flatlist')).toBeNull();
    });
  });

  it('рендерит все курсы, если тег не выбран', () => {
    const { getByTestId } = render(<CoursesScreen />);
    expect(getByTestId('course-card-1')).toBeTruthy();
    expect(getByTestId('course-card-2')).toBeTruthy();
    expect(getByTestId('course-card-3')).toBeTruthy();
  });

  it('фильтрует курсы по выбранному тегу', async () => {
    const { getByTestId, queryByTestId } = render(<CoursesScreen />);

    // Открываем модалку (можно без act, если ререндер синхронный)
    fireEvent.press(getByTestId('selector-button'));

    // Ждём, что модалка появилась
    await waitFor(() => expect(getByTestId('selector-modal')).toBeTruthy());

    // Выбираем тег "js"
    fireEvent.press(getByTestId('tag-js'));

    // Ждём, пока курсы отфильтруются
    await waitFor(() => {
      expect(getByTestId('course-card-1')).toBeTruthy();
      expect(getByTestId('course-card-3')).toBeTruthy();
      expect(queryByTestId('course-card-2')).toBeNull();
    });

    fireEvent.press(getByTestId('close-modal'));

    await waitFor(() => {
      expect(() => getByTestId('selector-modal')).toThrow();
    });
  });
});
