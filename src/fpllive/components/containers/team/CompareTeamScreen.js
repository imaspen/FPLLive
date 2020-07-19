import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import CustomHeader from '../../CustomHeader';
import TeamList from '../../presentational/team/TeamList';
import FantasyTeam from '../../../models/FantasyTeam';
import {fetchTeam} from '../../../actions/TeamActions';
import {fetchMyTeam} from '../../../actions/MyTeamActions';

class CompareTeamScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const team = navigation.getParam('title', 'Compare');
        const subtitle = navigation.getParam('subtitle');
        return ({
            title: 'Compare',
            header: () => <CustomHeader title={team} navigation={navigation} subtitle={subtitle}/>,
        });
    };

    static mapStateToProps(state, ownProps) {
        const {teams, players, events} = state.BootstrapReducer.bootstrap;
        let {picks, isFetching} = state.CompareTeamReducer;
        const teamPlayers = state.PlayerReducer.players;
        const teamId = ownProps.navigation.getParam('team');
        const team = teamId && picks[teamId] ? picks[teamId] : [];
        const myPicks = state.MyTeamReducer.picks;
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
            events: events,
            team: team.length === 15 ? FantasyTeam.fromJson(players)(team) : FantasyTeam.EmptyTeam,
            myTeam: myPicks.length === 15 ? FantasyTeam.fromJson(players)(myPicks) : FantasyTeam.EmptyTeam,
            isFetching: isFetching,
            isFetchingMyTeam: state.MyTeamReducer.isFetching,
            playerPoints: playerPoints,
        };
    }

    getTeamId = () => this.props.navigation.getParam('team');

    refreshCompareTeam() {
        this.props.dispatch(fetchTeam(this.getTeamId(), this.props.teams, this.props.events.find(event => event.isCurrent).id));
    }

    refreshMyTeam() {
        this.props.dispatch(fetchMyTeam('2211411', this.props.teams));
    }

    refresh() {
        this.refreshCompareTeam();
        this.refreshMyTeam();
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                if (this.getTeamId() && this.props.team === FantasyTeam.EmptyTeam && !this.props.isFetching) {
                    this.refreshCompareTeam();
                }
                if (this.props.myTeam === FantasyTeam.EmptyTeam && !this.props.isFetching) {
                    this.refreshMyTeam();
                }
            }
        );
    }

    selectPlayer = player => () => {
        this.props.navigation.push('Player', {'player': player});
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TeamList
                    refreshing={this.props.isFetching}
                    refresh={this.refresh.bind(this)}
                    team={this.props.team}
                    compareTeam={this.props.myTeam}
                    selectPlayer={this.selectPlayer}
                    points={this.props.playerPoints}
                />
            </View>
        );
    }
}

export default connect(CompareTeamScreen.mapStateToProps)(CompareTeamScreen);
