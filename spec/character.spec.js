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

});
