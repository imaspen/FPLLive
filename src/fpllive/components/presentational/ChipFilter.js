import React from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default props =>  (
    <View style={stylesheet.view}>
        {props.options.map((value, index) =>
            <Chip
                mode="outlined"
                key={index}
                style={stylesheet.chip}
                selected={props.selectedMode === index}
                onPress={() => props.selectMode(index)}
            >
                {value}
            </Chip>
        )}
    </View>
);

const stylesheet = StyleSheet.create({
    view: {
        padding: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 8,
    },
    chip: {
        marginRight: 8,
    },
});
