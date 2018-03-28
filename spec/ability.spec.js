const Ability = require('../src/ability');
const invalidScores = [0, 21, "asdf", 1.1];
const invalidAbilityScore = "Ability Score must be between 1 and 20"
const scoresWithModifiers = [
    {
        score: 1,
        modifier: -5
    },
    {
        score: 10,
        modifier: 0
    },
    {
        score: 20,
        modifier: 5
    },
    {
        score: 15,
        modifier: 2
    },
    {
        score: 5,
        modifier: -3
    }
]

describe("Ability", function() {
    describe('constructor',function() {

        it('should default to 10', function() {
            const ability = new Ability();
            expect(ability.score).toBe(10);
        })
        it('should return the ability score', function() {
            const ability = new Ability(15);
            expect(ability.score).toBe(15);
        })
        invalidScores.map( score => {
            it(`should throw error if ability is invalid. Given: ${score}`,function() {
                expect(() => new Ability(score)).toThrow(invalidAbilityScore);
            });
        });
        scoresWithModifiers.map( input => {
            it('should set the value of a given modifier', function(){
                const ability = new Ability(input.score);
                expect(ability.modifier).toBe(input.modifier);
            });
        });
    });

    describe('setScore()', function() {
        invalidScores.map( score => {
            it(`should throw if score is invalid. Given: ${score}`, function() {
                const ability = new Ability();
                expect(() => ability.score = score).toThrow(invalidAbilityScore);
            });
        });
        it("should set score to given value", function(){
            const ability = new Ability();
            ability.score = 16;
            expect(ability.score).toBe(16);
        });
        it('should call calculateModifier to set correct modifier value', function() {
            const ability = new Ability();
            spyOn(ability, "calculateModifier");
            ability.score = 16;
            expect(ability.calculateModifier).toHaveBeenCalled();
        });
        
        it('should set correct modifier value. Given 16, modifier is 3', function() {
            const ability = new Ability();
            ability.score = 16;
            expect(ability.modifier).toBe(3);
        });
    });

    describe('validateScore', function() {
        invalidScores.map( score => {
            it(`should return false if given score is invalid. Given: ${score}`, function() {
                const ability = new Ability();
                expect(ability.validateScore(score)).toBe(false);
            });
        });
        
    });

    describe('calculateModifier', function() {
        scoresWithModifiers.map( input => {
            it('should return the given input minus 10 divided 2 rounded down', function() {
                const ability = new Ability(input.score);
                expect(ability.calculateModifier()).toBe(input.modifier); 
            });
        });
    });
});