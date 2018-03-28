class Ability {
    constructor(score = 10) {
        if (!this.validateScore(score)) {
            throw "Ability Score must be between 1 and 20";
        }
        this._score = score;
        this._modifier = this.calculateModifier();
    }

    get score() {
        return this._score;
    }

    set score(score) {
        if (!this.validateScore(score)) {
            throw "Ability Score must be between 1 and 20";
        }
        this._score = score;
        this._modifier = this.calculateModifier();
    }

    get modifier() {
        return this._modifier;
    }

    validateScore(score) {
        return typeof score === "number" && Number.isInteger(score) && score >= 1 && score <= 20;
    }

    calculateModifier() {
        return Math.floor((this._score - 10) * 0.5);
    }
}

module.exports = Ability;