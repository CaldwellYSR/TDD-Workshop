const Character = require('../src/character').character;
const alignmentTypes = require('../src/character').alignmentTypes;
const Ability = require('../src/ability')

describe("Character", function() {

  beforeEach(function() {
    this.character = new Character("George");
  });

  describe("Name", function() {
    describe("getName()", function() {
      it('should return the name', function() {
        expect(this.character.name).toBe("George");
      });
    });

    describe("setName()", function() {
      it('should set the name', function(){
        this.character.name = "Fred";
        expect(this.character.name).toBe("Fred");
      });
    });
  });

  describe("Alignment", function() {
    describe("getAlignment()", function() {
      it('should return the alignment', function() {
        expect(this.character.alignment).toBe("Good");
      });
    });

    describe("setAlignemnt()", function(){
      it('should set the alignment to Evil', function(){
        this.character.alignment = alignmentTypes.Evil;
        expect(this.character.alignment).toBe("Evil");
      });
    });

    describe("validateAlignment", function() {
      it('should return true if alignment Good',function(){
        expect(this.character.validateAlignment(alignmentTypes.Good)).toBe(true);
      });
      it('should return true if alignment Neutral',function(){
        expect(this.character.validateAlignment(alignmentTypes.Neutral)).toBe(true);
      });
      it('should return true if alignment Evil',function(){
        expect(this.character.validateAlignment(alignmentTypes.Evil)).toBe(true);
      });
      it('should return false if given alignment is not a number', function() {
        expect(this.character.validateAlignment("NotAnAlignment")).toBe(false);
      });
      it('should return false if less than 0', function(){
        expect (this.character.validateAlignment(-1)).toBe(false);
      });
      it('should return false if greater than 2', function() {
        expect (this.character.validateAlignment(3)).toBe(false);
      });
      it('should return false if alignment is not an integer',function(){
        expect(this.character.validateAlignment(1.1)).toBe(false);
      });
    });
  });

  describe("Armor Class", function() {
    it('should have a default AC of 10', function() {
      expect(this.character.armorClass).toBe(10);
    });
    it('should set AC to new value (15)',function() {
      this.character.armorClass = 15;
      expect(this.character.armorClass).toBe(15);
    });
    it('should add dex modifier to AC value', function() {
      this.character.dexterity = 12; // Makes modifier +1
      expect(this.character.armorClass).toBe(11);
    });
  });

  describe("Hit Points", function() {
    it('should have default HP of 5', function() {
      expect(this.character.hitPoints).toBe(5);
    });
    it('should set the HP to 10', function(){
      this.character.hitPoints = 10;
      expect(this.character.hitPoints).toBe(10);
    });
    it('should set HP to zero if given negative number', function() {
      this.character.hitPoints = -10;
      expect(this.character.hitPoints).toBe(0)
    });
    it('should add constitution modifier to HP', function() {
      this.character.constitution = 12; // This makes modifier 1
      expect(this.character.hitPoints).toBe(6);
    });
    it('should account for constitution modifier when calculating the death limit', function(){
      this.character.constitution = 12; // This makes modifier 1
      this.character.takeDamage(5);
      expect(this.character.hitPoints).toBe(1);
    });
  });

  describe("isHit", function() {
    it('should return true if die roll meets AC', function() {
      expect(this.character.isHit(10)).toBe(true);
    });
    it('should return true if die roll is greater than  AC', function() {
      expect(this.character.isHit(15)).toBe(true);
    });
    it('should return false if die roll does not meet or beat AC', function() {
      expect(this.character.isHit(5)).toBe(false);
    });
  });

  describe("takeDamage", function() {
    it('should reduce hp by given value', function() {
      this.character.takeDamage(2);
      expect(this.character.hitPoints).toBe(3);
    });
    it('should not reduce hp below 0', function() {
      this.character.takeDamage(10);
      expect(this.character.hitPoints).toBe(0);
    });
  });

  describe("isAlive", function(){
    it('should return true if hitpoints are greater than 0', function(){
      expect(this.character.isAlive()).toBe(true);
    });
    it('should return false if hitPoints are zero', function() {
      this.character.hitPoints = 0;
      expect(this.character.isAlive()).toBe(false);
    });
  });

  describe("attack", function() {
    it('should damage opponent by 1 point if dieroll beats AC', function() {
      var opponent = new Character("Fred");
      this.character.attack(opponent, 15);
      expect(opponent.hitPoints).toBe(4);
    });
    it('should damage opponent by 2 if dieroll is a natural 20', function(){
      var opponent = new Character("Fred");
      opponent.armorClass = 23;
      this.character.attack(opponent,20);
      expect(opponent.hitPoints).toBe(3);
    });
    it('should add strength modifier to damage dealth', function() {
      var opponent = new Character("Fred");

      // Should do 2 damage (strenght modifier is 1)
      this.character.strength = 12;
      this.character.attack(opponent, 15);
      expect(opponent.hitPoints).toBe(3);
    });
    it('should add double strength modifier to critical damage dealth', function() {
      var opponent = new Character("Fred");

      // Should do 2 damage (strenght modifier is 1)
      this.character.strength = 12;
      this.character.attack(opponent, 20);
      expect(opponent.hitPoints).toBe(1);
    });
  });

  describe("Abilities", function(){
    const abilities = [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma"
    ];

    abilities.map(ability => {
      it(`should have ${ability}`,function(){
        expect(this.character[ability]).toEqual(jasmine.any(Ability));
      });
    });
    it('should change the value of the consitution',function(){
      this.character.constitution = 12;
      expect(this.character.constitution.score).toBe(12);
    });
    it('should update the character\'s hitPoints', function() {
      this.character.constitution = 12;
      expect(this.character.hitPoints).toBe(6);
    });
    it('should always add at least 1 point for constitution', function(){
      this.character.constitution = 1;
      expect(this.character.hitPoints).toBe(1);
    });
  });
});
