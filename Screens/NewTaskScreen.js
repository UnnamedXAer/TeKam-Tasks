import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from '../Components/Header'

const NewTaskScreen = (props) => {
    return (
        <ScrollView style={styles.screen}>
            <Header>Add New Task</Header>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default NewTaskScreen;