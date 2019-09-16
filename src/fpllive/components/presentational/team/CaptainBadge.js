import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {Badge} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

export default props => (
    <Badge
        style={[styles.badge, lineHeight]}
        size={20}
    >
        <Text allowFontScaling={false}>{props.string}</Text>
    </Badge>
);

DeviceInfo.getFontScale().then(fontScale => {
    lineHeight.lineHeight = Math.round(20 / fontScale);
});

const lineHeight = {
    lineHeight: 20,
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
