import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Header from '../Components/Header';

const FiltersScreen = (props) => {
    return (
        <ScrollView style={styles.screen}>
            <Header>Available Filters / Restrictions</Header>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
export default FiltersScreen;