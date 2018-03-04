var scripts = require('../js/scripts.js')

describe('getResponse', () => {
    it('should return a value', () => {
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
        expect(checkMarsInitialise('23 4 6')).toEqual(false)
    })
    it('should return false if arguments are not solely integers', () => {
        expect(checkMarsInitialise('1 A')).toEqual(false)
    })
    it('should return false if any co-ordinate is above fifty', () => {
        expect(checkMarsInitialise('51 30')).toEqual(false)
    })
})

describe('checkValidStartPos', () => {
    it('should return false if argument is not 3 characters long', () => {
        expect(checkValidStartPos('111 E')).toEqual(false)
    })
    it('should return false if argument is not two numbers followed by a compass direction', () => {
        expect(checkValidStartPos('1 e 1')).toEqual(false)
    })
    it('should return argument passed as array if valid', () => {
        expect(checkValidStartPos('1 1 n')).toEqual(['1','1','n'])
    })
    it('should return false if any co-ordinate is above fifty', () => {
        expect(checkValidStartPos('51 49 e')).toEqual(false)
    })
})

describe('checkValidRoute', () => {
    it('should return false if argument contains non valid characters', () => {
        expect(checkValidRoute('rflrg')).toEqual(false)
    })
    it('should return the argument as an array if all chars are valid', () => {
        expect(checkValidRoute('rflrlf')).toEqual(['r','f','l','r','l','f'])
    })
})

describe('moveRobot', () => {
    it('should return updated robot positions with lost status information', () => {
        expect(moveRobot(['F','F','F'],['9','10','N'],['10','10'],[])).toEqual([9, 10, "N", true])
    })
    it('should not care about route or direction case', () => {
        expect(moveRobot(['f','F','F'],['9','10','s'],['10','10'],[['9','10']])).toEqual([9, 7, "S", false])
    })
})