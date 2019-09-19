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
            header: <CustomHeader title={team} navigation={navigation} subtitle={subtitle}/>,
        });
    };

    static mapStateToProps(state, ownProps) {
        const {teams, players} = state.BootstrapReducer.bootstrap;
        const {picks, isFetching} = state.CompareTeamReducer;
        const teamId = ownProps.navigation.getParam('team');
        const team = teamId && picks[teamId] ? picks[teamId] : [];
        const myPicks = state.MyTeamReducer.picks;
        return {
            ...ownProps,
            teams: teams,
            players: players,
            team: team.length === 15 ? FantasyTeam.fromJson(players)(team) : FantasyTeam.EmptyTeam,
            myTeam: myPicks.length === 15 ? FantasyTeam.fromJson(players)(myPicks) : FantasyTeam.EmptyTeam,
            isFetching: isFetching,
            isFetchingMyTeam: state.MyTeamReducer.isFetching,
        };
    }

    getTeamId = () => this.props.navigation.getParam('team');

    refreshCompareTeam() {
        this.props.dispatch(fetchTeam(this.getTeamId(), 4));
    }

    refreshMyTeam() {
        this.props.dispatch(fetchMyTeam('2211411'));
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
                    selectPlayer={this.selectPlayer}/>
            </View>
        );
    }
}

export default connect(CompareTeamScreen.mapStateToProps)(CompareTeamScreen);
