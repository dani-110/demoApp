import React from 'react';
import {Text} from 'react-native';
import {SafeAreaLayout} from '../../components';
import {styles} from '../../shared/styles';

export const CalenderView = ({}): React.ReactElement => {
  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Text>hello</Text>
    </SafeAreaLayout>
  );
};
