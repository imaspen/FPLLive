export default class Entry {
    constructor(id, name, position, points, gameWeekPoints, playerName) {
        this.id = id;
        this.name = name;
        this.position = Number(position);
        this.points = Number(points);
        this.gameWeekPoints = gameWeekPoints;
        this.playerName = playerName;
    }

    static fromJson(json) {
        return new Entry(json.entry, json.entry_name, json.rank, json.total, json.event_total, json.player_name);
    }
}