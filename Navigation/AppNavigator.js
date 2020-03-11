import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import TasksScreen from '../Screens/TasksScreen';
import CustomHeaderButton from '../Components/CustomHeaderButton';
import NewTaskScreen from '../Screens/NewTaskScreen';
import Colors from '../Constants/Colors';
import CompletedTasks from '../Screens/CompletedTasks';
import FiltersScreen from '../Screens/FiltersScreen';
import EmptyScreen from '../Screens/EmptyScreen';
import AuthScreen from '../Screens/AuthScreen';
import StartScreen from '../Screens/StartScreen';
import { logOut } from '../store/actions';
import Button from '../Components/Button';

const defaultNavigationOptions = (navData) => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.white
        },
        headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary
    };
}

const stackNavigationHeaderLeft = (navData) => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
    <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer();
    }} />
</HeaderButtons>;

const TasksStackNavigation = createStackNavigator({
    Tasks: {
        screen: TasksScreen,
        navigationOptions: (navData) => {
            return {
                title: 'My Tasks',
                headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item title="Add" iconComponent="Entypo" iconName="add-to-list" onPress={() => {
                        navData.navigation.navigate('NewTask');
                    }} />
                </HeaderButtons>,
                headerLeft: () => stackNavigationHeaderLeft(navData)
            };
        },
    },
    NewTask: {
        screen: NewTaskScreen,
        navigationOptions: (navData) => {
            return {
                title: 'Add Task',
                // headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                //     <Item title="Save" iconComponent="Feather" iconName="save" onPress={() => {
                //         navData.navigation.navigate('Tasks');
                //     }} />
                // </HeaderButtons>,
            };
        },
    }
}, {
    defaultNavigationOptions
}
);

const CompletedTasksStackNavigation = createStackNavigator({
    CompletedTasks: {
        screen: CompletedTasks,
        navigationOptions: (navData) => {
            return {
                title: 'Completed Tasks',
                headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item title="Add" iconComponent="Entypo" iconName="add-to-list" onPress={() => {
                        navData.navigation.navigate('NewTask');
                    }} />
                </HeaderButtons>,
                headerLeft: () => stackNavigationHeaderLeft(navData)
            };
        }
    }
}, {
    defaultNavigationOptions
});

const tabsNavigatorConfig = {
    Tasks: {
        screen: TasksStackNavigation,
        navigationOptions: (navData) => {
            return {
                tabBarLabel: 'Tasks',
                title: 'Tasks',
                tabBarIcon: (tabInfo) => {
                    return <FontAwesome
                        name="tasks"
                        size={22}
                        color={Colors.pDark} />
                },
                tabBarColor: Colors.sDark
            };
        }
    },
    CompletedTasks: {
        screen: CompletedTasksStackNavigation,
        navigationOptions: navData => {
            return {
                tabBarLabel: 'Completed Tasks',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons
                        name="playlist-add-check"
                        size={27}
                        color={Colors.pDark} />
                },

                tabBarColor: Colors.pLight
            };
        }
    }
}

const TabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabsNavigatorConfig, {
        shifting: true,
        barStyle: {
            backgroundColor: Colors.pLight
        }
    })
    : createBottomTabNavigator(tabsNavigatorConfig);

const FiltersStackNavigation = createStackNavigator({
    Filters: {
        screen: FiltersScreen,
        navigationOptions: (navData) => {
            return {
                title: 'Filters',
                headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item title="Save" iconComponent="Feather" iconName="save" onPress={() => {
                        navData.navigation.navigate('TasksTabs');
                    }} />
                </HeaderButtons>,
            };
        }
    }
}, {
    defaultNavigationOptions
});

const DrawerNavigator = createDrawerNavigator({
    TasksTabs: {
        screen: TabNavigator,
        navigationOptions: (navData) => {
            return {
                drawerLabel: 'Tasks',
                title: 'Tasks'
            }
        }
    },
    NewTask: {
        screen: NewTaskScreen,
        navigationOptions: (navData) => {
            return {
                title: 'Add Task',
                drawerLabel: 'Add Task'
            };
        }
    },
    FiltersStack: {
        screen: FiltersStackNavigation,
        navigationOptions: (navData) => {
            return {
                title: 'Filters/Sort Options',
                drawerLabel: 'Filters/Sort Options',
            };
        }
    },
    About: {
        screen: EmptyScreen
    }
}, {
    contentOptions: {
        activeTintColor: Colors.sDark,
        inactiveTintColor: Colors.pLight
    },
    contentComponent: (props) => {
        const dispatch = useDispatch();
        const emailAddress = useSelector(state => state.auth.emailAddress);

        const textStyle = {color: Colors.pLight, fontStyle: 'italic', };

        return <View style={{
            flex: 1,
            paddingTop: 30
        }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={{ maxWidth: '100%', paddingHorizontal: 15, alignItems: 'flex-end' }}>
                    <Text style={textStyle}>Hello</Text>
                    <Text style={textStyle}>{emailAddress}</Text>
                </View>
                <DrawerItems
                    {...props} />
                <Button
                    styleText={{
                        fontSize: 14,
                        color: Colors.pLight
                    }}
                    style={{
                        backgroundColor: Colors.white,
                        borderColor: Colors.white,
                        paddingLeft: 10,
                        alignItems: 'flex-start'
                    }}
                    onPress={() => {
                        dispatch(logOut());
                        props.navigation.navigate('Auth');
                    }}>Log Out</Button>
            </SafeAreaView>
        </View>;
    }
});

const AuthStackNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Authorization'
        }
    }
}, {
    defaultNavigationOptions: defaultNavigationOptions
})

const MainNavigator = createSwitchNavigator({
    Start: StartScreen,
    AuthStack: AuthStackNavigator,
    TasksDrawer: DrawerNavigator,
}, {
    initialRouteName: 'Start'
})

export default createAppContainer(MainNavigator);