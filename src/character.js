const Ability = require('./ability');

const alignments = ["Good", "Neutral", "Evil"];

const alignmentTypes = {
  Good: 0,
  Neutral: 1,
  Evil: 2
}

class Character {
  constructor(name, alignment) {
    if(!this.validateAlignment(alignment)) {
      alignment = alignmentTypes.Good;
    }
    this._name = name;
    this._alignment = alignments[alignment];
    this._strength = new Ability();
    this._dexterity = new Ability();
    this._constitution = new Ability();
    this._intelligence = new Ability();
    this._wisdom = new Ability();
    this._charisma = new Ability();
    this._armorClass = 10;
    this._hitPoints = 5 + this._constitution.modifier;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get armorClass() {
    return this._armorClass;
  }

  set armorClass(armorClass) {
    this._armorClass = armorClass;
  }

  get hitPoints() {
    return this._hitPoints;
  }

  set hitPoints(hitPoints){
    this._hitPoints = hitPoints;
    if (this._hitPoints < 0) {
      this._hitPoints = 0;
    }
  }

  get strength() {
    return this._strength;
  }

  set strength(score) {
    this._strength.score = score;
  }

  get dexterity() {
    return this._dexterity;
  }

  set dexterity(score) {
    this._dexterity.score = score;
    this.armorClass += this.dexterity.modifier;
  }

  get constitution() {
    return this._constitution;
  }

  set constitution(score) {
    this._constitution.score = score;
    this.hitPoints = Math.max(1, this.hitPoints + this.constitution.modifier);
  }

  get intelligence() {
    return this._intelligence;
  }

  get wisdom() {
    return this._wisdom;
  }

  get charisma() {
    return this._charisma;
  }
  validateAlignment(alignment) {
    return typeof alignment == 'number' && Number.isInteger(alignment) && alignment >= alignmentTypes.Good && alignment <= alignmentTypes.Evil;
  }

  get alignment() {
    return this._alignment;
  }

  set alignment(alignment){
    if(!this.validateAlignment(alignment)) {
      throw "That is not a valid alignment you goon! Valid alignments are [Good, Neutral, Evil] - Use alignmentTypes object as a helper"
    }
    this._alignment = alignments[alignment];
  }

  isHit(dieRoll) {
    return dieRoll >= this._armorClass;
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  isAlive(){
    return this.hitPoints > 0;
  }

  attack(opponent, dieRoll) {
    if (!opponent.isHit(dieRoll) && dieRoll != 20) {
      return
    }

    let damage =
      (dieRoll == 20)
        ? Math.max(1, 2 + (this._strength.modifier * 2))
        : Math.max(1, 1 + this._strength.modifier);

    opponent.takeDamage(damage);
  }
}

module.exports = {
  character: Character,
  alignmentTypes: alignmentTypes
};
