export default class PlayerDetails {
    constructor(history, fixtures) {
        this.history = history;
        this.fixtures = fixtures;
    }

    static fromJson = teams => json => new PlayerDetails(
        json.history.map(PastGame.fromJson(teams)),
        json.fixtures.map(Fixture.fromJson(teams))
    )
}

class PastGame {
    constructor(code, opponent, points, home, homeScore, awayScore, minutes, goalsScored, assists, cleanSheet, goalsConceded, ownGoals, penaltiesSaved, penaltiesMissed, yellowCards, redCards, saves, bonus, bps) {
        this.code = code;
        this.opponent = opponent;
        this.points = points;
        this.home = home;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.minutes = minutes;
        this.goalsScored = goalsScored;
        this.assists = assists;
        this.cleanSheet = cleanSheet;
        this.goalsConceded = goalsConceded;
        this.ownGoals = ownGoals;
        this.penaltiesSaved = penaltiesSaved;
        this.penaltiesMissed = penaltiesMissed;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.saves = saves;
        this.bonus = bonus;
        this.bps = bps;
    }

    static fromJson = teams => json => new PastGame(
        json.fixture,
        teams.find(team => team.id === json.opponent_team),
        json.total_points,
        json.was_home,
        json.team_h_score,
        json.team_a_score,
        json.minutes,
        json.goals_scored,
        json.assists,
        json.clean_sheets === 1,
        json.goals_conceded,
        json.own_goals,
        json.penalties_saved,
        json.penalties_missed,
        json.yellow_cards,
        json.red_cards,
        json.saves,
        json.bonus,
        json.bps
    )
}

class Fixture {
    constructor(code, homeTeam, awayTeam, gameWeek, isHome, fdr) {
        this.code = code;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.gameWeek = gameWeek;
        this.isHome = isHome;
        this.fdr = fdr;
    }

    static fromJson = teams => json => new Fixture(
        json.code,
        teams.find(team => team.id === json.team_h),
        teams.find(team => team.id === json.team_a),
        json.event,
        json.is_home,
        json.difficulty
    )
}
