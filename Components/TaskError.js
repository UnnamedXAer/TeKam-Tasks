import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const TaskError = ({ error }) => {

    if (!error) {
        return null;
    }

    return (
        <View style={styles.error}>
            <View style={{ paddingHorizontal: 5 }}>
                <MaterialIcons name="error-outline" size={27} color={Colors.danger} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        borderColor: Colors.danger,
        borderWidth: 2,
        padding: 5,
        paddingLeft: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errorText: {
        color: Colors.danger,
        textAlign: 'center',
        marginLeft: 5
    }
});

export default TaskError;
