'use strict';

const quoteService = require('../src/middleware/service/quote-service');

describe('GET / Quote',  () => {
    it('Should return random quote', async () => {
        let response = await quoteService.getQuote();
        expect(response.success).toBe(true);
        expect(response.quote).not.toBeNull();
    });
});
