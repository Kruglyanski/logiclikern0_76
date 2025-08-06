import { useEffect, useState } from 'react';
import axios from 'axios';
import { ICourse } from '../interfaces/course';

export const useApi = () => {
  const [data, setData] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<ICourse[]>('https://logiclike.com/docs/courses.json')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { courses: data, isLoading, error };
};