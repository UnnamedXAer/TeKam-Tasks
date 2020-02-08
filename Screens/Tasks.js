import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from '../Components/Header'

const Tasks = () => {
    return (
        <ScrollView style={styles.screen}>
            <Header>Tasks to Complete</Header>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default Tasks;