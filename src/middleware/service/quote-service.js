'use strict';

const axios = require('axios');
const _ = require('lodash');

module.exports.getQuote = async () => {
    let quote = null;
    let success = false;
    await axios.get('https://type.fit/api/quotes')
        .then((res) => {
            let quotes = res.data;
            quote = _.shuffle(quotes)[0];
            success = true;
        }).catch((err) => {
            console.log(err)
        });

    return {
        success: success,
        quote: quote
    }
}
