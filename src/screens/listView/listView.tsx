import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaLayout} from '../../components';
import {styles} from '../../shared/styles';
import {Button, Card, Input, Layout, Text} from '@ui-kitten/components';
import {TaskList} from '../../@types';
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateTaskModal} from '../../model';

export const ListView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [name, setName] = useState('');
  const [data, setData] = useState<Array<TaskList>>([]);
  const [filterModalVisible, setFilterModalVisible] =
    React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // AsyncStorage.removeItem('taskList');
  useEffect(() => {
    const loadData = async () => {
      AsyncStorage.getItem('taskList')
        .then(res => {
          console.log('this is offline');
          if (res != null) {
            setList(JSON.parse(res));
            setData(JSON.parse(res));
          } else {
            console.log('this is online');

            AsyncStorage.setItem('taskList', 'true').then(res => {
              getList();
            });
          }
        })
        .catch(err => {
          console.log(err);
          console.log('this is online');

          AsyncStorage.setItem('taskList', 'true').then(res => {
            getList();
          });
        });
    };
    loadData();
  }, []);

  const getList = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      const startDate = new Date('2023-03-01');
      const mapList = res.data.map((todo: TaskList) => {
        let date = startDate.setDate(startDate.getDate() + 1);

        return {
          ...todo,
          date: startDate,
          start: startDate,
          end: startDate,
        };
      });
      setList(mapList);
      setData(mapList);
    });
  };
  useEffect(() => {
    setData(
      list.filter(x => x.title.toLowerCase().includes(name.toLowerCase())),
    );
  }, [name]);

  useEffect(() => {
    console.log('it should be run');
    setData(list);
  }, [list]);

  const Item = (props: any) => (
    <Card style={styles.card}>
      <View style={style.dashboardItemHeader}>
        <Text style={style.headerText} category="label">
          {props.item.title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{moment(props.item?.date).format('MMMM Do, YYYY')}</Text>
          <Button
            onPress={() => {
              setList(prev =>
                prev.map((item, i) =>
                  item.id === props.item.id
                    ? {...item, completed: !item?.completed}
                    : item,
                ),
              );
            }}
            status={props.item?.completed ? 'success' : 'danger'}
            size="small">
            {props.item?.completed ? 'completed' : 'not completed'}
          </Button>
        </View>
      </View>
    </Card>
  );
  const toggleFilterModal = (): void => {
    setFilterModalVisible(!filterModalVisible);
  };
  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Layout style={{margin: 5, flexDirection: 'row'}}>
        <Input
          placeholder="Search"
          clearButtonMode="always"
          value={name}
          onChangeText={setName}
          style={{flex: 1}}
        />
        <Button onPress={toggleFilterModal} appearance="ghost">
          Create
        </Button>
        <CreateTaskModal
          visible={filterModalVisible}
          onBackdropPress={toggleFilterModal}
          onGotItButtonPress={toggleFilterModal}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Layout>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaLayout>
  );
};
const style = StyleSheet.create({
  dashboardItemHeader: {
    paddingVertical: 16,
    justifyContent: 'flex-start',
    fontSize: 24,
  },
  headerText: {
    color: '#192126',
  },
});
