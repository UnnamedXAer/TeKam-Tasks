import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';

const Card = props => {
    return (
        <View style={styles.card}>
        <View style={styles.cardContent}>
            {props.children}
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 7,
        backgroundColor: '#eee',
        shadowOffset: { width: -10, height: 7},
        shadowColor: Colors.secondary,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10
    },
    cardContent: {
        marginHorizontal: 8,
        marginVertical: 10
    }
})

export default Card;
