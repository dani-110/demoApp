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


export const ListView = ({}): React.ReactElement => {
  const [list, setList] = useLocalStorage<Array<TaskList>>('taskList', []);
  const [name, setName] = useState("")
  const [data, setData] = useState<Array<TaskList>>([])

  useEffect(() => {
    const loadData =async() =>{
      AsyncStorage.getItem('taskList').then(res=>{
        console.log("this is offline");
        if(res){
          setList(JSON.parse(res))
          setData(JSON.parse(res))
        }
      }).catch(err=>{
        console.log(err);
        console.log("this is online");
        
        AsyncStorage.setItem('taskList','true').then(res=>{
          getList();
        })
        })
    }
    loadData()
  }, []);

  const getList = async () => {
    console.log('get list');
    await axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      const startDate = new Date('2023-03-01');

      const mapList =res.data.map((todo:TaskList)=>{
        return {
          ...todo,
          date: moment(startDate).format('MMMM Do, YYYY'),
        }
      })
      setList(mapList);
      setData(mapList);
      // setLists(arr);
    });
  };
  useEffect(() => {
    setData(list.filter(x=>x.title.toLowerCase().includes(name.toLowerCase())))
  }, [name])

  useEffect(() => {
   setData(list)
  }, [list])
  
 
  const Item = (props: any) => (
    <Card style={styles.card}>
      <View style={style.dashboardItemHeader}>
        <Text style={style.headerText} category="label">
          {props.item.title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{props.item.date}</Text>
          {/* <Text>{props.item.completed ? 'completed' : 'not completed'}</Text> */}
          <Button onPress={() => {
            console.log(props.item.completed)
              setList((prev) =>
              prev.map((item, i) =>
                item.id === props.item.id ? { ...item, completed: !item.completed } : item
              )
            );
          }} status={props.item.completed? 'success':'danger'} size="small">{props.item.completed ? 'completed' : 'not completed'}</Button>
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
          value={name}
          onChangeText={setName}
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
