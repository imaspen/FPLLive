import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlayerFixtures from '../../presentational/player/PlayerFixtures';

class PlayerFixturesScreen extends Component {
    static mapStateToProps(state, ownProps) {
        const playerId = ownProps.navigation.getParam('player').id;
        return {
            ...ownProps,
            playerDetails: state.PlayerReducer.players[playerId].player,
        };
    }

    render() {
        const {navigation} = this.props;
        const refresh = navigation.getParam('refresh');
        const refreshing = navigation.getParam('refreshing');
        return (
            <PlayerFixtures
                refresh={refresh}
                refreshing={refreshing}
                playerDetails={this.props.playerDetails}
            />
        );
    }
}

export default connect(PlayerFixturesScreen.mapStateToProps)(PlayerFixturesScreen);
