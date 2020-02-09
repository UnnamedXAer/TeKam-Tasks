import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from '../Constants/Colors';

const CustomHeaderButton = (props) => {

    let inconComponent = Ionicons;
    if (props.iconComponent === 'Entypo') {
        inconComponent = Entypo
    }
    else if (props.iconComponent === 'Feather') {
        inconComponent = Feather;
    }

    return (
        <HeaderButton
            {...props}
            color={Platform.OS === 'android' ? Colors.white : Colors.primary}
            iconSize={30}
            IconComponent={inconComponent} />
    );
};

export default CustomHeaderButton;