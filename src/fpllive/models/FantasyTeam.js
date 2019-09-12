import Player from './Player';
import Pick from './Pick';

export default class FantasyTeam {
    static EmptyTeam = new FantasyTeam(
        [], [], [], [], [], undefined, undefined
    );

    constructor(goalkeeper, defenders, midfielders, forwards, substitutes, captain, viceCaptain) {
        this.goalkeeper = goalkeeper;
        this.defenders = defenders;
        this.midfielders = midfielders;
        this.forwards = forwards;
        this.substitutes = substitutes;
        this.captain = captain;
        this.viceCaptain = viceCaptain;
    }

    getAllPlayers = () => [...this.goalkeeper, ...this.defenders, ...this.midfielders, ...this.forwards];

    static fromJson = players => json => {
        const filterPlayers = position => player => player.position === position;
        const getPosition = position => firstTeam.filter(filterPlayers(position));

        const picks = json.map(Pick.fromJson);
        const fantasyPlayers = picks.map(pick => players.find(player => player.id === pick.id));
        const firstTeam = fantasyPlayers.slice(0, 11);

        const goalkeeper = getPosition(Player.Positions.GKP);
        const defenders = getPosition(Player.Positions.DEF);
        const midfielders = getPosition(Player.Positions.MID);
        const forwards = getPosition(Player.Positions.FWD);
        const substitutes = fantasyPlayers.slice(11, 15);

        const captainId = picks.find(pick => pick.isCaptain).id;
        const viceId = picks.find(pick => pick.isViceCaptain).id;

        const captain = players.find(player => player.id === captainId);
        const viceCaptain = players.find(player => player.id === viceId);

        return new FantasyTeam(goalkeeper, defenders, midfielders, forwards, substitutes, captain, viceCaptain);
    }
}
