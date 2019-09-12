import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {Badge} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

export default props => {
    DeviceInfo.getFontScale().then(fontScale => {
        styles.badge.lineHeight = Math.round(20 / fontScale);
    });
    return (
        <Badge
            style={styles.badge}
            size={20}
        >
            <Text allowFontScaling={false}>{props.string}</Text>
        </Badge>
    );
};
const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
