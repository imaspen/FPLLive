import React from 'react';
import {DataTable, Text} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';

export default props => {
    const renderItem = ({item: fixture}) => (
        <DataTable.Row key={fixture.code}>
            <DataTable.Cell>
                <Text style={fixture.isHome ? styles.team : null}>{fixture.homeTeam.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={fixture.isHome ? styles.team : null}>
                <Text style={fixture.isHome ? null : styles.team}>{fixture.awayTeam.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>{fixture.fdr}</DataTable.Cell>
        </DataTable.Row>
    );

    const renderHeader = () => (
        <DataTable.Header style={{backgroundColor: 'white'}}>
            <DataTable.Title>Home Team</DataTable.Title>
            <DataTable.Title>Away Team</DataTable.Title>
            <DataTable.Title numeric>FDR</DataTable.Title>
        </DataTable.Header>
    );

    const {playerDetails} = props;

    return (
        <View style={{flex: 1}}>
            <DataTable>
                <FlatList
                    stickyHeaderIndices={[0]}
                    onRefresh={props.refresh}
                    refreshing={props.refreshing}
                    data={playerDetails ? playerDetails.fixtures : null}
                    keyExtractor={item => item.code.toString()}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderItem}
                    ListFooterComponent={<View style={{paddingBottom: 160}} />}
                />
            </DataTable>
        </View>
    );
};

const styles = StyleSheet.create({
    team: {
        fontWeight: 'bold',
    },
});
