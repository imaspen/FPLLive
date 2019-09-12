import Entry from './Entry';

export default class League {
    constructor(name, teams) {
        this.name = name;
        this.entries = teams;
    }

    static fromJson(json): League {
        return new League(json.league.name, json.standings.results.map(entry => Entry.fromJson(entry)))
    }
}
