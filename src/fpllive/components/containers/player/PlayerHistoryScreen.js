import React, {Component} from 'react';
import PlayerHistory from '../../presentational/player/PlayerHistory';
import {connect} from 'react-redux';

class PlayerHistoryScreen extends Component {
    static mapStateToProps(state, ownProps) {
        const player = ownProps.navigation.getParam('player');
        return {
            ...ownProps,
            player: player,
            playerDetails: state.PlayerReducer.players[player.id].player,
        };
    }

    render() {
        const {navigation} = this.props;
        const refresh = navigation.getParam('refresh');
        const refreshing = navigation.getParam('refreshing');
        return (
            <PlayerHistory
                refresh={refresh}
                refreshing={refreshing}
                playerDetails={this.props.playerDetails}
                player={this.props.player}
            />
        );
    }
}

export default connect(PlayerHistoryScreen.mapStateToProps)(PlayerHistoryScreen);
