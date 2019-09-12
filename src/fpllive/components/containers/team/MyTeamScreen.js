import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import CustomHeader from '../../CustomHeader';
import TeamList from '../../presentational/team/TeamList';
import {fetchMyTeam} from '../../../actions/MyTeamActions';
import FantasyTeam from '../../../models/FantasyTeam';

class MyTeamScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'My Team',
            header: <CustomHeader title="My Team" navigation={navigation}/>,
        });
    };

    static mapStateToProps(state, ownProps) {
        const {teams, players} = state.BootstrapReducer;
        const {picks, isFetching} = state.MyTeamReducer;
        return {
            ...ownProps,
            teams: teams,
            players: players,
            team: picks.length === 15 ? FantasyTeam.fromJson(players)(picks) : FantasyTeam.EmptyTeam,
            isFetching: isFetching,
        };
    }

    refresh() {
        this.props.dispatch(fetchMyTeam('2211411'));
    }

    componentDidMount() {
        if (this.props.team === FantasyTeam.EmptyTeam) {
            this.refresh();
        }
    }

    selectPlayer = player => () => {
        this.props.navigation.push('Player', {'player': player});
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TeamList
                    refreshing={this.props.isFetching || this.props.team === FantasyTeam.EmptyTeam}
                    refresh={this.refresh.bind(this)}
                    team={this.props.team}
                    selectPlayer={this.selectPlayer}/>
            </View>
        );
    }
}

export default connect(MyTeamScreen.mapStateToProps)(MyTeamScreen);
