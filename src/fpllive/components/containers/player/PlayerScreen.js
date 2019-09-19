import React, {Component} from 'react';

import {connect} from 'react-redux';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';

import CustomHeader from '../../CustomHeader';
import PlayerPhoto from '../../presentational/player/PlayerPhoto';
import PlayerTabBar from '../../presentational/player/PlayerTabBar';
import {fetchPlayer} from '../../../actions/PlayerActions';
import PlayerFixturesScreen from './PlayerFixturesScreen';
import PlayerHistoryScreen from './PlayerHistoryScreen';

const Navigator = createMaterialTopTabNavigator({
    History: PlayerHistoryScreen,
    Fixtures: PlayerFixturesScreen,
}, {
    tabBarComponent: PlayerTabBar,
});

class PlayerScreen extends Component {
    static router = Navigator.router;

    static navigationOptions = ({navigation}) => {
        const player = navigation.getParam('player');
        return {
            header: <CustomHeader title={player.getFullName()} subtitle={player.team.name} navigation={navigation}
                                  elevation={0}/>,
        };
    };

    static mapStateToProps(state, ownProps) {
        const player = ownProps.navigation.getParam('player');
        return {
            ...ownProps,
            teams: state.BootstrapReducer.bootstrap.teams,
            fetching: state.PlayerReducer.isFetching,
            player: player,
            playerDetails: state.PlayerReducer.players[player.id],
        };
    }

    refresh() {
        this.props.dispatch(fetchPlayer(this.props.navigation.getParam('player').id, this.props.teams));
    }

    componentDidMount() {
        if (this.props.playerDetails === undefined) {
            this.refresh();
        }
        const props = {
            refresh: this.refresh.bind(this),
            refreshing: this.props.fetching,
        };
        this.props.navigation.navigate('Fixtures', props);
        this.props.navigation.navigate('History', props);
    }

    render() {
        const {player} = this.props;
        return (
            <View style={{flex: 1}}>
                <Navigator navigation={this.props.navigation}/>
                <PlayerPhoto
                    source={`https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p${player.photo}.png`}
                />
            </View>
        );
    }
}

export default connect(PlayerScreen.mapStateToProps)(PlayerScreen);
