import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Tasks from '../Screens/Tasks';

const stackNavigation = createStackNavigator({
    Tasks: {
        screen: Tasks
    }
});

export default createAppContainer(stackNavigation);