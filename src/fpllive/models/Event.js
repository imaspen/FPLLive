export default class Event {
    constructor(id, name, isCurrent, finished) {
        this.id = id;
        this.name = name;
        this.isCurrent = isCurrent;
        this.finished = finished;
    }

    static fromJson(json) {
        return new Event(json.id, json.name, json.is_current, json.finished);
    }
}
