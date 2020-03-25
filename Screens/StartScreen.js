import React, { useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Colors from '../Constants/Colors';
import { logIn, authorizeByRefreshToken } from '../store/actions';

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
                    await dispatch(authorizeByRefreshToken(userData));
                }
                else {
                    await dispatch(logIn(userData));
                }

                setTimeout(async () => {
                    await getUserData();
                }, (userData.expirationTime - currentTime))

                props.navigation.navigate('Tasks');
            }
            catch (err) {
                console.log('start screen err', { ...err });
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