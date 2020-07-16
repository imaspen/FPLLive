import React from 'react';

import {withTheme} from 'react-native-paper';
import {MaterialTopTabBar} from 'react-navigation-tabs';

const PlayerTabBar = props => (
    <MaterialTopTabBar
        {...props}
        activeTintColor="#ffffff"
        inactiveTintColor="#ffffff"
        indicatorStyle={{
            backgroundColor: props.theme.colors.accent,
            height: 4,
        }}
        style={{
            backgroundColor: props.theme.colors.primary,
        }}
    />
);

export default withTheme(PlayerTabBar);
