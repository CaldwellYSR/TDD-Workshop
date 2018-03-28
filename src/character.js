var alignments =["Good", "Neutral", "Evil"];

var alignmentTypes = {
  Good: 0,
  Neutral: 1,
  Evil: 2
}

function Character(name, alignment) {
  if(!this.validateAlignment(alignment)) {
    alignment = alignmentTypes.Good;
  }
  this.name = name;
  this.alignment = alignments[alignment];
  this.armorClass = 10;
  this.hitPoints = 5;
}

Character.prototype.getName = function() {
  return this.name;
}

Character.prototype.setName = function(name) {
  this.name = name;
}

Character.prototype.getArmorClass = function() {
  return this.armorClass;
}

Character.prototype.setArmorClass = function(armorClass) {
  this.armorClass = armorClass;
}

Character.prototype.getHitPoints = function() {
  return this.hitPoints;
}

Character.prototype.setHitPoints = function(hitPoints){
  this.hitPoints = hitPoints;
}

Character.prototype.validateAlignment = function(alignment) {
  return typeof alignment == 'number' && Number.isInteger(alignment) && alignment >= alignmentTypes.Good && alignment <= alignmentTypes.Evil;
}

Character.prototype.getAlignment = function() {
  return this.alignment;
}

Character.prototype.setAlignment = function(alignment){
  if(!this.validateAlignment(alignment)) {
    throw "That is not a valid alignment you goon! Valid alignments are [Good, Neutral, Evil] - Use alignmentTypes object as a helper"
  }
  this.alignment = alignments[alignment];
}

Character.prototype.isHit = function(dieRoll) {
  return dieRoll >= this.getArmorClass();
}

Character.prototype.takeDamage = function(damage) {
  this.setHitPoints(this.getHitPoints() - damage);
  if (this.getHitPoints() < 0) {
    this.setHitPoints(0);
  }
}

Character.prototype.isAlive = function(){
  return this.getHitPoints() > 0;
}

module.exports = {
  character: Character,
  alignmentTypes: alignmentTypes
};
