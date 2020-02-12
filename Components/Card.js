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
        elevation: 3,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
        shadowRadius: 10,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5
    },
    cardContent: {
        marginHorizontal: 8,
        marginVertical: 10
    }
})

export default Card;
