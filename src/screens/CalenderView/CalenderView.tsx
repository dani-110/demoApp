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
import {Calendar, EventRenderer} from 'react-native-big-calendar';
import useLocalStorage from '../../hooks/useLocalStorage';
import {Datepicker, Divider, ListItem} from '@ui-kitten/components';
import {TaskList} from '../../@types';

interface ICalendarEventBase {
  start: Date;
  end: Date;
  title: string;
}

export const CalenderView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [Data, setData] = React.useState<Array<ICalendarEventBase>>([]);
  const [SelectedDate, setSelectedDate] = React.useState(new Date());
  const events = [
    {
      title: 'Meeting',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Coffee break',
      start: new Date(),
      end: new Date(),
    },
  ];
  // list.map(e => console.log(typeof e.date, typeof new Date()));
  useEffect(() => {
    list.map(e => {
      Data.push({
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
      });
    });
    setData(Data);
  }, []);

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
        events={Data}
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
