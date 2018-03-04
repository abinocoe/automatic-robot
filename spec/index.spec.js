var scripts = require('../js/scripts.js')

describe('getResponse', () => {
    it('should return a value', () => {
        expect(getResponse()).toBeTruthy();
        expect(getResponse('random')).toBeTruthy();
    })
})

describe('checkInputIsValid', () => {
    it('should fail if the incorrect number of instructions are given', () => {
        let input = "One\nTwo";
        expect(checkInputIsValid(input)).toEqual(false)
    })
})

describe('checkMarsInitialise', () => {
    it('should return false if argument is not 2 characters long', () => {
        expect(checkMarsInitialise('234')).toEqual(false)
    })
    it('should return false if arguments are not solely integers', () => {
        expect(checkMarsInitialise('1A')).toEqual(false)
    })
})

describe('checkValidStartPos', () => {
    it('should return false if argument is not 3 characters long', () => {
        expect(checkValidStartPos('111E')).toEqual(false)
    })
    it('should return false if argument is not two numbers followed by a compass direction', () => {
        expect(checkValidStartPos('1e1')).toEqual(false)
    })
    it('should return argument passed as array if valid', () => {
        expect(checkValidStartPos('11n')).toEqual(['1','1','n'])
    })
})