export default class Pick {
    constructor(id, position, isCaptain, isViceCaptain) {
        this.id = id;
        this.position = position;
        this.isCaptain = isCaptain;
        this.isViceCaptain = isViceCaptain;
    }

    static fromJson(json) {
        return new Pick(json.element, json.position, json.is_captain, json.is_vice_captain);
    }
}