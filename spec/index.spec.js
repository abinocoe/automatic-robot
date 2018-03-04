var scripts = require('../js/scripts.js')

describe('getResponse', () => {
    it('should return a value', () => {
        expect(getResponse()).toBeTruthy();
        expect(getResponse('random')).toBeTruthy();
        expect(getResponse(5)).toBeTruthy();
    })
})