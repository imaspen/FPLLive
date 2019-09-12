export default class Player {
    static Positions = {
        GKP: 1,
        DEF: 2,
        MID: 3,
        FWD: 4,
    };

    constructor(id, forename, surname, shortName, team, position, photo) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.shortName = shortName;
        this.team = team;
        this.position = position;
        this.photo = photo;
    }

    getFullName() {
        return `${this.forename} ${this.surname}`;
    }

    getShirt() {
        return this.team.getShirt(this.position === Player.Positions.GKP);
    }

    static fromJson = teams => json => {
        const teamId = json.team_code;
        return new Player(
            json.id,
            json.first_name,
            json.second_name,
            json.web_name,
            teams.find(team => team.code === teamId),
            json.element_type,
            json.photo.split('.')[0]
        );
    }
}
