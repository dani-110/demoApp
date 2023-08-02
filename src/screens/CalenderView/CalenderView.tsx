import React, {useEffect} from 'react';
import {
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

export const CalenderView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [events, setEvents] = React.useState<Array<TaskList>>([]);
  const [SelectedDate, setSelectedDate] = React.useState(new Date());

  const customEvent: EventRenderer = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        style={[
          ...(touchableOpacityProps.style as RecursiveArray<ViewStyle>),
          {
            backgroundColor: 'white',
            borderWidth: 1,
            borderLeftColor: event.completed ? 'red' : 'green',
            borderLeftWidth: 10,
            borderStyle: 'solid',
          },
        ]}>
        <ListItem
          {...touchableOpacityProps}
          style={{
            paddingHorizontal: -4,
            paddingVertical: 0,
          }}
          title={props => (
            <Text
              {...props}
              numberOfLines={1}
              style={{fontSize: 9}}
              category="s2">
              {event.title}
            </Text>
          )}
          accessoryLeft={event.icon}
        />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setEvents(
      list
        .slice(150, 200)
        .map(item => ({...item, start: new Date(item.start)})),
    );
  }, [list]);
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
        renderEvent={customEvent}
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
