import React from 'react';

import {Appbar} from 'react-native-paper';

export default props => (
    <Appbar style={{elevation: props.elevation === undefined ? 4 : props.elevation}}>
        {props.navigation.isFirstRouteInParent() ? null : <Appbar.BackAction onPress={() => props.navigation.goBack()}/>}
        <Appbar.Content title={props.title} subtitle={props.subtitle} />
    </Appbar>
);
