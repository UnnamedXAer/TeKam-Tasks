import React, { useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Colors from '../Constants/Colors';
import { logIn } from '../store/actions';

const StartScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (!data) {
                    return props.navigation.navigate('Auth');   
                }
                const currentTime = Date.now();
                const userData = JSON.parse(data);
                if (userData.expirationTime <= currentTime) {
                    await AsyncStorage.removeItem('userData');
                    return props.navigation.navigate('Auth');   
                }

                await dispatch(logIn(
                    userData.userId,
                    userData.emailAddress,
                    userData.token,
                    userData.expirationTime
                ));
                props.navigation.navigate('Tasks');
            }
            catch (err) {
                props.navigation.navigate('Auth');   
            }
        }

        getUserData();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator color={Colors.secondary} size="large" >
            </ActivityIndicator>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartScreen;