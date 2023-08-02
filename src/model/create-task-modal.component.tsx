import {
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  Modal,
  ModalProps,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {TaskList} from '../@types';
import {CalendarIcon} from '../components';
import {RenderFields} from '../components';
import useLocalStorage from '../hooks/useLocalStorage';

interface CreateTaskModalProps extends Omit<ModalProps, 'children'> {
  onGotItButtonPress: () => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateTaskModal = (
  props: CreateTaskModalProps,
): React.ReactElement => {
  const {onGotItButtonPress, ...modalProps} = props;

  const [Task, setTask] = React.useState<TaskList>({});
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);

  const onChange = (fieldKey: string, fieldValue: any) => {
    const a = Object.assign({}, Task);
    a[fieldKey] = fieldValue;
    setTask(a);
  };

  const addNewTask = () => {
    let obj = {
      ...Task,
      date: Task.date,
      start: Task.date,
      end: Task.date,
      completed: false,
      id: list[list.length - 1]?.id + 1,
      userId: 9,
    };
    setList([...list, obj]);
    setTask({});
  };

  return (
    <Modal backdropStyle={styles.backdrop} {...modalProps}>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text category="h6">Create new Task</Text>
        </View>
        <ScrollView>
          <Divider />
          <RenderFields
            fullWidth
            State={Task}
            onChange={onChange}
            Fields={[
              {name: 'title', label: 'Title', type: 'string'},
              {name: 'date', label: 'Date', type: 'date'},
            ]}
          />
          <Divider />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            size="small"
            style={styles.button}
            onPress={() => {
              onGotItButtonPress();
              addNewTask();
            }}>
            Done
          </Button>
        </View>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 16,
    width: 320,
  },
  description: {
    marginTop: 8,
    marginBottom: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  button: {
    width: 100,
  },
});
