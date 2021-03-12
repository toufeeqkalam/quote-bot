'use strict';

const APP_SETTINGS = require('config');
const _ = require('lodash');

const quoteIntent = require('./intents/quote-intent');

const dispatch = (event, callback) => {
    let intent = event.currentIntent.name;
    switch (intent) {
        case 'QuoteIntent':
            return quoteIntent.quote(event, callback);
        default:
            return callback('Unknown event {}');
    }

}

exports.webhook = (event, context, callback) => {
    try {
        if (event.bot.name && _.eq(event.bot.name, APP_SETTINGS.BOT_NAME)) {
            return dispatch(event, (response) => callback(null, response));
        } else {
            return callback('Invalid bot name {}');
        }
    } catch (err) {
        console.error(err);
    }
};
