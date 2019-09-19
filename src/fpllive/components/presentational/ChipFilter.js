import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {Chip} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default props =>  (
    <FlatList
        style={stylesheet.view}
        data={props.options}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({item, index}) => (
            <Chip
                mode="outlined"
                style={stylesheet.chip}
                selected={props.selected === index}
                onPress={props.select(index)}
            >
                {item}
            </Chip>
        )}
        ItemSeparatorComponent={() => <View style={stylesheet.separator}/>}
        ListHeaderComponent={() => <View style={stylesheet.separator}/>}
        ListFooterComponent={() => <View style={stylesheet.separator}/>}
    />
);

const stylesheet = StyleSheet.create({
    view: {
        backgroundColor: 'white',
        elevation: 8,
        flexGrow: 0,
        paddingTop: 8,
        paddingBottom: 8,
    },
    separator: {
        marginLeft: 8,
    },
});
