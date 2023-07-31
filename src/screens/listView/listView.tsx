import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaLayout} from '../../components';
import {styles} from '../../shared/styles';
import {Card, Input, Layout, Text} from '@ui-kitten/components';
import {TaskList} from '../../@types';
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage';
import moment from 'moment';

export const ListView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [Name, setName] = useState("")
  const [data, setData] = useState(list)
 
  useEffect(() => {
    if( Name.length>1)
    setData(list.filter(x=>x.title.toLowerCase().includes(Name.toLowerCase())))
    else
    setData(list)
  }, [Name,list]);
  

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      const startDate = new Date('2023-03-01');
      // let arr: any[] = [];
      res.data.forEach((e: TaskList) => {
        startDate.setDate(startDate.getDate() + 1);
        list.push({
          ...e,
          date: moment(startDate).format('MMMM Do, YYYY'),
        });
      });
      setList(list.concat());
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
  console.log(Name);
  

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Layout style={{margin: 5}}>
        <Input
          placeholder="Search"
          clearButtonMode="always"
          value={Name}
          onChangeText={nextValue => setName(nextValue)}
          // accessoryLeft={renderSearchIcon}
          // accessoryRight={renderCloseIcon}
          // onChangeText={nextValue => onChange("Name", nextValue)}
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
