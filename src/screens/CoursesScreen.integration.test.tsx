import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CoursesScreen } from './CoursesScreen';

// Мокаем только useApi, а компоненты реальные проверяем
jest.mock('../hooks/useApi', () => ({
    useApi: jest.fn(),
}));

import { useApi as mockedUseApi } from '../hooks/useApi';

const mockCourses = [
  { id: '1', name: 'JS for Beginners', tags: ['js'] },
  { id: '2', name: 'TS Masterclass', tags: ['ts'] },
  { id: '3', name: 'React Advanced', tags: ['react', 'js'] },
];

describe('CoursesScreen — интеграционный тест', () => {
  beforeEach(() => {
    (mockedUseApi as jest.Mock).mockReturnValue({
      courses: mockCourses,
      isLoading: false,
    });
  });

  it('фильтрует курсы по тегу js через модалку', async () => {
    const { getByTestId, getByText, queryByText } = render(<CoursesScreen />);


    fireEvent.press(getByTestId('selector-button'));

    await waitFor(() => getByTestId('selector-modal'));

    fireEvent.press(getByTestId('selector-modal-tag-js'));

    await waitFor(() => {
      expect(getByText('JS for Beginners')).toBeTruthy();
      expect(getByText('React Advanced')).toBeTruthy();
      expect(queryByText('TS Masterclass')).toBeNull(); // этого не должно быть
    });
  });
});
