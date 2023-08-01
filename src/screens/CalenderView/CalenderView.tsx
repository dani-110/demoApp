import React, {useEffect} from 'react';
import {
  Dimensions,
  RecursiveArray,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {CalendarIcon, SafeAreaLayout} from '../../components';
import {Calendar} from 'react-native-big-calendar';
import useLocalStorage from '../../hooks/useLocalStorage';
import {Datepicker, Divider} from '@ui-kitten/components';
import {TaskList} from '../../@types';

export const CalenderView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [events, setEvents] = React.useState<Array<TaskList>>([]);
  const [SelectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    setEvents(
      list.slice(0, 30).map(item => ({...item, start: new Date(item.start)})),
    );
  }, [list]);
  // useEffect(() => {
  //   setEvents(
  //     list
  //       .map(item => ({...item, start: new Date(item.start)}))
  //       .filter(
  //         x =>
  //           x.start.getMonth() === SelectedDate.getMonth() &&
  //           x.start.getFullYear() === SelectedDate.getFullYear(),
  //       ),
  //   );
  // }, [SelectedDate]);

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Datepicker
        date={SelectedDate}
        onSelect={nextDate => setSelectedDate(nextDate)}
        accessoryRight={CalendarIcon}
      />
      <Divider />

      <Calendar
        height={300}
        events={events}
        date={SelectedDate}
        overlapOffset={100}
        eventMinHeightForMonthView={20}
        dayHeaderStyle={{height: 20}}
        mode="month"
      />
    </SafeAreaLayout>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topButton: {marginLeft: 8},
  roundButton: {
    borderRadius: 24,
    width: 24,
    height: 24,
  },
  topHeaderMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
