import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import {fetchLeague} from '../../actions/LeagueActions';
import LeagueList from '../presentational/league/LeagueList';
import CustomHeader from '../CustomHeader';

class LeagueScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Home',
            header: () => <CustomHeader title="Home" navigation={navigation} />,
        });
    };

    state = {pointsToShow: 0};

    refreshLeague() {
        this.props.dispatch(fetchLeague('220867'));
    }

    componentDidMount() {
        this.refreshLeague();
    }

    selectTeam = (teamId, teamName, playerName) => () => {
        const props = {team: teamId, title: teamName, subtitle: playerName};
        this.props.navigation.navigate('Compare', props, NavigationActions.navigate({
            routeName: 'CompareTeam',
            params: props,
        }));
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <LeagueList
                    selectTeam={this.selectTeam.bind(this)}
                    selectedMode={this.state.pointsToShow}
                    selectMode={index => () => this.setState({pointsToShow: index})}
                    mode={this.state.pointsToShow}
                    entries={this.props.league.entries}
                    refreshing={this.props.refreshing}
                    refresh={this.refreshLeague.bind(this)}
                />
            </View>
        );
    }

    static mapStateToProps(state, ownProps) {
        const {LeagueReducer} = state;
        return {
            ...ownProps,
            league: LeagueReducer.league,
            refreshing: LeagueReducer.isFetching,
        };
    }
}

export default connect(LeagueScreen.mapStateToProps)(LeagueScreen);
