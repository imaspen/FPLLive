import Event from './Event';
import Team from './Team';
import Player from './Player';

export default class Bootstrap {
    constructor (teams, players, events) {
        this.teams = teams;
        this.players = players;
        this.events = events;
    }

    static fromJson(json) {
        const teams = json.teams.map(Team.fromJson);
        const players = json.elements.map(Player.fromJson(teams));
        const events = json.events.map(Event.fromJson);

        return new Bootstrap(teams, players, events);
    }
}
