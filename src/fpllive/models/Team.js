import Shirts from '../Shirts';

export default class Team {
    constructor(id, code, name, shortName) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.shortName = shortName;
    }

    getShirt(goalkeeper = false) {
        return Shirts[this.code][goalkeeper ? 'keeper' : 'normal'];
    }

    static fromJson(json) {
        return new Team(json.id, json.code, json.name, json.short_name);
    }
}
