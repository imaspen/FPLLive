import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import MyTeamScreen from '../components/containers/team/MyTeamScreen';
import PlayerScreen from '../components/containers/player/PlayerScreen';

export default {
    screen: createStackNavigator({
        MyTeam: {
            screen: MyTeamScreen,
        },
        Player: {
            screen: PlayerScreen,
        },
    }),
    navigationOptions: {
        tabBarLabel: 'My Team',
        tabBarIcon: ({tintColor}) => (
            <Icon name="account-group" color={tintColor} size={25}/>
        ),
    },
};
