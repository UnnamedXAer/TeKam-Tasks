import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { myTasks } from '../data/dummy-data';
import Header from '../Components/Header';
import Colors from '../Constants/Colors';

const EmptyScreen = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadDummyDataHandler = () => {
        Promise.all(myTasks.map(x => axios.post('https://rn-tasks.firebaseio.com/tasks.json', x)))
            .then(res => console.log('post: ', res.data))
            .catch(console.log);

    };

    const removeDummyDataHandler = () => {
        axios.delete('https://rn-tasks.firebaseio.com/.json')
            .then(res => {
                console.log('datele', res.data)
            })
            .catch(console.log);
    };

    const getDummyDataHandler = () => {
        setLoading(true);
        axios.get('https://rn-tasks.firebaseio.com/tasks.json')
            .then(res => {
                console.log('get ',Object.keys(res.data).length);
                const t = [];
                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        const element = res.data[key];
                        t.push(element);
                    }
                }
                setTasks(t);
            })
            .catch(console.log)
            .finally(() => {
                console.log('finnaly');
                setLoading(false);
            });
    };

    return (
        <View>
            <Text>Dummy Screen</Text>
            <Header>Uload Data</Header>
            <Button title="Upload dummy data" onPress={uploadDummyDataHandler} />
            <Header>Remove Data</Header>
            <Button title="REMOVE dummy data" onPress={removeDummyDataHandler} />
            <Header>Get Data</Header>
            <Button title="GET dummy data" onPress={getDummyDataHandler} />
            {loading && <ActivityIndicator color={Colors.secondary} size="large" />}
            {
                tasks.map(x => <Text key={x.id}>{x.title}</Text>)
            }
        </View>
    );
};

export default EmptyScreen;