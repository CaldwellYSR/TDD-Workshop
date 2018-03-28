var Character = require('../src/character.js').character;
var alignmentTypes = require('../src/character.js').alignmentTypes;

describe("Character", function() {

  beforeEach(function() {
    this.character = new Character("George");
  });

  describe("Name", function() {
    describe("getName()", function() {
      it('should return the name', function() {
        expect(this.character.getName()).toBe("George");
      });
    });

    describe("setName()", function() {
      it('should set the name', function(){
        this.character.setName("Fred");
        expect(this.character.getName()).toBe("Fred");
      });
    });
  });

  describe("Alignment", function() {
    describe("getAlignment()", function() {
      it('should return the alignment', function() {
        expect(this.character.getAlignment()).toBe("Good");
      });
    });

    describe("setAlignemnt()", function(){
      it('should set the alignment to Evil', function(){
        this.character.setAlignment(alignmentTypes.Evil);
        expect(this.character.getAlignment()).toBe("Evil");
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
      expect(this.character.getArmorClass()).toBe(10);
    });
    it('should set AC to new value (15)',function(){
      this.character.setArmorClass(15)
      expect(this.character.getArmorClass()).toBe(15)
    });
  });

  describe("Hit Points", function() {
    it('should have default HP of 5', function() {
      expect(this.character.getHitPoints()).toBe(5);
    });
    it('should set the HP to 10', function(){
      this.character.setHitPoints(10);
      expect(this.character.getHitPoints()).toBe(10);
    });
    it('should set HP to zero if given negative number', function() {

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
      expect(this.character.getHitPoints()).toBe(3);
    });
    it('should not reduce hp below 0', function() {
      this.character.takeDamage(10);
      expect(this.character.getHitPoints()).toBe(0);
    });
  });
  describe("isAlive", function(){
    it('should return true if hitpoints are greater than 0', function(){
      expect(this.character.isAlive()).toBe(true);
    });
    it('should return false if hitPoints are zero', function() {
      this.character.setHitPoints(0);
      expect(this.character.isAlive()).toBe(false);
    });
  });

});
