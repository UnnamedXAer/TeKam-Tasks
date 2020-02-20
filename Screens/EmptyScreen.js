import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Header from '../Components/Header';
import Colors from '../Constants/Colors';

const EmptyScreen = () => {

    return (
        <View>
            <Header>Dummy Screen</Header>
            {<ActivityIndicator color={Colors.secondary} size="large" />}
        </View>
    );
};

export default EmptyScreen;