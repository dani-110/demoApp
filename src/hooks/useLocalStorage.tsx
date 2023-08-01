// import {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const useLocalStorage = (key: string, initialValue: any) => {
//   const getLocalValue = (key: string, initialValue: any) => {
//     // if a value is already store
//     let localValue;
//     AsyncStorage.getItem(key).then((res: any) => {
//       localValue = res;
//     });
//     console.log(initialValue, 'initialValue');

//     if (localValue) {
//       return localValue;
//     }

//     return initialValue;
//   };

//   const [value, setValue] = useState(() => {
//     return getLocalValue(key, initialValue);
//   });

//   useEffect(() => {
//     console.log('hey', initialValue);
//     AsyncStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);
//   return [value, setValue];
// };

import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevValue: T) => T)) => Promise<void>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, [key]);

  const setValue = async (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? (value as Function)(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
