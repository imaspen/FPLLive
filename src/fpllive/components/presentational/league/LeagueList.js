import React from 'react';
import {FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import ChipFilter from '../ChipFilter';

export default props => (
    <FlatList
        ListHeaderComponent={
            <ChipFilter options={['Total', 'This Week']} selected={0} selectMode={props.selectMode}
                        selectedMode={props.selectedMode}/>
        }
        stickyHeaderIndices={[0]}
        data={props.entries}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
            <ListItem
                onPress={props.selectTeam(item.id.toString(), item.name, item.playerName)}
                key={item.id}
                title={item.name}
                leftAvatar={
                    <Avatar
                        size="small"
                        title={item.position.toString()}
                        rounded
                    />
                }
                subtitle={item.playerName}
                rightTitle={props.mode === 0 ? item.points.toString() : item.gameWeekPoints.toString()}
            />
        )}
        onRefresh={props.refresh}
        refreshing={props.refreshing}
    />
);
