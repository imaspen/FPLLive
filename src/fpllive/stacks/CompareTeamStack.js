import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import CompareTeamScreen from '../components/containers/team/CompareTeamScreen';
import PlayerScreen from '../components/containers/player/PlayerScreen';

export default {
    screen: createStackNavigator({
        CompareTeam: {
            screen: CompareTeamScreen,
        },
        Player: {
            screen: PlayerScreen,
        },
    }),
    navigationOptions: {
        tabBarLabel: 'Compare',
        tabBarIcon: ({tintColor}) => (
            <Icon name="clipboard-account" color={tintColor} size={25}/>
        ),
    },
};
