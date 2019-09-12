import React from 'react';
import {View, FlatList} from 'react-native';
import {Avatar, DataTable, Divider, List} from 'react-native-paper';

import Player from '../../../../models/Player';


export default props => {
    const TableTitle = titleProps => titleProps.value > 0 ? (
        <DataTable.Title numeric style={{justifyContent:'center'}}>{titleProps.content}</DataTable.Title>
    ) : null;

    const TableCell = cellProps => cellProps.value > 0 ? (
        <DataTable.Cell numeric style={{justifyContent:'center'}}>
            {cellProps.value} ({cellProps.toPoints(cellProps.value)})
        </DataTable.Cell>
    ) : null;

    const renderItem = ({item: game}) => {
        const homeTeam = game.home ? props.player.team.name : game.opponent.name;
        const awayTeam = game.home ? game.opponent.name : props.player.team.name;
        return (
            <List.Accordion
                key={game.code}
                title={`${homeTeam} ${game.homeScore}-${game.awayScore} ${awayTeam}`}
                left={() => <Avatar.Text label={game.points} size={32}/>}
            >
                {renderPoints(game)}
            </List.Accordion>
        );
    };

    const renderPoints = game => {
        const pos = props.player.position;
        return (
            <DataTable style={{paddingLeft: 0, textAlign: 'center'}}>
                <DataTable.Header>
                    <DataTable.Title numeric style={{justifyContent:'center'}}>MP</DataTable.Title>
                    <TableTitle content="GS" value={game.goalsScored} />
                    <TableTitle content="AS" value={game.assists} />
                    {pos === Player.Positions.GKP || pos === Player.Positions.DEF
                        ? <TableTitle content="CS" value={game.cleanSheet} />
                        : null
                    }
                    {pos === Player.Positions.GKP || pos === Player.Positions.DEF
                        ? <TableTitle content="GC" value={game.goalsConceded} />
                        : null
                    }
                    <TableTitle content="OG" value={game.ownGoals} />
                    <TableTitle content="PS" value={game.penaltiesSaved} />
                    <TableTitle content="PM" value={game.penaltiesMissed} />
                    <TableTitle content="YC" value={game.yellowCards} />
                    <TableTitle content="RC" value={game.redCards} />
                    <TableTitle content="SA" value={game.saves} />
                    <TableTitle content="BP" value={game.bonus} />
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell numeric style={{justifyContent:'center'}}>
                        {game.minutes} ({toPoints.minutes(game.minutes)})
                    </DataTable.Cell>
                    <TableCell content="GS" value={game.goalsScored} toPoints={toPoints.goalsScored(pos)} />
                    <TableCell content="AS" value={game.assists} toPoints={toPoints.assists} />
                    {pos === Player.Positions.GKP || pos === Player.Positions.DEF
                        ? <TableCell content="CS" value={Number(game.cleanSheet)} toPoints={toPoints.cleanSheet} />
                        : null
                    }
                    {pos === Player.Positions.GKP || pos === Player.Positions.DEF
                        ? <TableCell content="GC" value={game.goalsConceded} toPoints={toPoints.goalsConceded} />
                        : null
                    }
                    <TableCell content="OG" value={game.ownGoals} toPoints={toPoints.ownGoals} />
                    <TableCell content="PS" value={game.penaltiesSaved} toPoints={toPoints.penaltiesSaved} />
                    <TableCell content="PM" value={game.penaltiesMissed} toPoints={toPoints.penaltiesMissed} />
                    <TableCell content="YC" value={game.yellowCards} toPoints={toPoints.yellowCards} />
                    <TableCell content="RC" value={game.redCards} toPoints={toPoints.redCards} />
                    <TableCell content="SA" value={game.saves} toPoints={toPoints.saves} />
                    {game.bonus > 0
                        ? <DataTable.Cell numeric style={{justifyContent: 'center'}}>{game.bonus}</DataTable.Cell>
                        : null
                    }
                </DataTable.Row>
            </DataTable>
        );
    };

    return (
        <FlatList
            refreshing={props.refreshing}
            onRefresh={props.refresh}
            keyExtractor={item => item.code.toString()}
            data={props.playerDetails ? props.playerDetails.history : []}
            ItemSeparatorComponent={() => <Divider/>}
            renderItem={renderItem}
            ListFooterComponent={() => <View style={{paddingBottom:160}}/>}
        />
    );
};

const toPoints = {
    minutes: minutes => minutes === 0 ? 0 : minutes < 60 ? 1 : 2,
    goalsScored: position => goalsScored => {switch (position) {
        case Player.Positions.GKP:
        case Player.Positions.DEF: return goalsScored * 6;
        case Player.Positions.MID: return goalsScored * 5;
        case Player.Positions.FWD: return goalsScored * 4;
    }},
    assists: assists => 3 * assists,
    cleanSheet: cleanSheet => cleanSheet * 4,
    goalsConceded: goalsConceded => -Math.floor(goalsConceded / 2),
    ownGoals: ownGoals => ownGoals * -2,
    penaltiesSaved: penaltiesSaved => penaltiesSaved * 5,
    penaltiesMissed: penaltiesMissed => penaltiesMissed * 2,
    yellowCards: yellowCards => yellowCards * -1,
    redCards: redCards => redCards * -1,
    saves: saves => Math.floor(saves / 3),
};
