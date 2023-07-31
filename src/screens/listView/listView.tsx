import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaLayout} from '../../components';
import {styles} from '../../shared/styles';
import {Card, Input, Layout, Text} from '@ui-kitten/components';
import {TaskList} from '../../@types';
import axios from 'axios';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import moment from 'moment';
// import axios from '../../api/apiMethods';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const ListView = ({}): React.ReactElement => {
  const [List, setList] = useState<Array<TaskList>>([]);
  const [Lists, setLists] = useLocalStorage('taskList', []);

  useEffect(() => {
    // getList();
    // if (!Lists) {
    getList();
    // }
  }, []);

  const getList = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      const startDate = new Date('2023-03-01');
      // let arr: any[] = [];
      res.data.forEach((e: TaskList) => {
        startDate.setDate(startDate.getDate() + 1);
        List.push({
          ...e,
          date: moment(startDate).format('MMMM Do, YYYY'),
        });
      });
      setList(List.concat());
      // setLists(arr);
    });
  };

  const Item = (props: any) => (
    <Card style={styles.card}>
      <View style={style.dashboardItemHeader}>
        <Text style={style.headerText} category="label">
          {props.item.title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{props.item.date}</Text>
          <Text>{props.item.completed ? 'completed' : 'not completed'}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Layout style={{margin: 5}}>
        <Input
          placeholder="Search"
          clearButtonMode="always"
          // value={State["Name"]}
          // accessoryLeft={renderSearchIcon}
          // accessoryRight={renderCloseIcon}
          // onChangeText={nextValue => onChange("Name", nextValue)}
        />
      </Layout>
      <FlatList
        data={List}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaLayout>
  );
};
const style = StyleSheet.create({
  dashboardItemHeader: {
    paddingVertical: 16,
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 24,
    // alignItems: 'center',
  },
  headerText: {
    // fontSize: 16,
    // fontWeight: '800',
    color: '#192126',
  },
});
