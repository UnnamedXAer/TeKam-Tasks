import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';

const CompletedTasks = (props) => {
    return (
        <ScrollView style={styles.screen}>
            <Header>Task History</Header>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default CompletedTasks;