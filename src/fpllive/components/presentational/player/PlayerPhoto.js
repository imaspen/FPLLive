import React from 'react';
import {StyleSheet, Image} from 'react-native';

export default props => (
    <Image style={style.picture} source={{uri: props.source}} />
);

const style = StyleSheet.create({
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 110,
        height: 140,
        marginRight: 10,
    },
});
