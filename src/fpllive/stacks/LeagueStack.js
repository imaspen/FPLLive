import {createStackNavigator} from 'react-navigation-stack';
import LeagueScreen from '../components/containers/LeagueScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export default {
    screen: createStackNavigator({
        League: LeagueScreen,
    }),
    navigationOptions: {
        tabBarLabel: 'Standings',
        tabBarIcon: ({tintColor}) => (
            <Icon name="format-list-numbered" color={tintColor} size={25}/>
        ),
    },
};
