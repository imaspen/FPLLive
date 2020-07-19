import React, {Component} from 'react';
import {SectionList, View} from 'react-native';
import {connect} from 'react-redux';

import CustomHeader from '../../CustomHeader';
import TeamList from '../../presentational/team/TeamList';
import {fetchMyTeam} from '../../../actions/MyTeamActions';
import FantasyTeam from '../../../models/FantasyTeam';
import ChipFilter from '../../presentational/ChipFilter';

class MyTeamScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'My Team',
            header: () => <CustomHeader title="My Team" navigation={navigation}/>,
        });
    };

    static mapStateToProps(state, ownProps) {
        const {teams, players, events} = state.BootstrapReducer.bootstrap;
        let {picks, isFetching} = state.MyTeamReducer;
        const teamPlayers = state.PlayerReducer.players;
        const playerPoints = {};
        if (!isFetching) {
            Object.keys(teamPlayers).forEach(key => {
                const player = teamPlayers[key];
                if (!player.isFetching) {
                    playerPoints[key] = player.player.history[player.player.history.length - 1].points;
                } else {
                    isFetching = true;
                }
            });
        }
        return {
            ...ownProps,
            teams: teams,
            players: players,
            events: events.filter(event => event.finished).reverse(),
            team: picks.length === 15 ? FantasyTeam.fromJson(players)(picks) : FantasyTeam.EmptyTeam,
            isFetching: isFetching,
            playerPoints: playerPoints,
        };
    }

    state = {
        selected: 0,
    };

    refresh() {
        this.props.dispatch(fetchMyTeam('2211411', this.props.teams));
    }

    componentDidMount() {
        if (this.props.team === FantasyTeam.EmptyTeam) {
            this.refresh();
        }
    }

    selectPlayer = player => () => {
        this.props.navigation.push('Player', {'player': player});
    };

    selectWeek = index => () => {
        this.setState({selected: index});
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ChipFilter
                    options={[
                        'Current Team',
                        ...this.props.events.map(event => event.name),
                    ]}
                    selected={this.state.selected}
                    select={this.selectWeek}
                />
                <TeamList
                    refreshing={this.props.isFetching || this.props.team === FantasyTeam.EmptyTeam}
                    refresh={this.refresh.bind(this)}
                    team={this.props.team}
                    selectPlayer={this.selectPlayer}
                    points={this.props.playerPoints}
                />
            </View>
        );
    }
}

export default connect(MyTeamScreen.mapStateToProps)(MyTeamScreen);
