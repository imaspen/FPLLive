export default class Event {
    constructor(id, name, finished) {
        this.id = id;
        this.name = name;
        this.finished = finished;
    }

    static fromJson(json) {
        return new Event(json.id, json.name, json.finished);
    }
}
