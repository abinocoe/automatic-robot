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