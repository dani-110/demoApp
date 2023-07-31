import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorage = (key: string, initialValue: any) => {
  const getLocalValue = (key: string, initialValue: any) => {
    // if a value is already store
    let localValue;
    AsyncStorage.getItem(key).then((res: any) => {
      localValue = res;
    });

    if (localValue) {
      return localValue;
    } else {
      return initialValue;
    }
  };

  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
