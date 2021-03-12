'use strict';

const _ = require('lodash');
const dialog = require('../helper/lex-helper');
const quoteService = require('../middleware/service/quote-service');

const validateSlots = (slots, sessionAttributes, intentName ,callback) => {
    return {isValid: true};
}

module.exports.quote = async (event, callback) => {

    const sessionAttributes = event.sessionAttributes || {};
    const requestAttributes = event.requestAttributes || {};
    const slots = event.currentIntent.slots;
    const intentName = event.currentIntent.name;
    const confirmationStatus = event.currentIntent.confirmationStatus;

    if (_.eq(event.invocationSource, 'DialogCodeHook')) {

        let result = validateSlots(slots, sessionAttributes, intentName, callback);
        if (!result.isValid) {
            slots[`${result.violatedSlot}`] = null;
            return callback(dialog.elicitSlot(sessionAttributes, intentName, slots, validationResult.violatedSlot, validationResult.message));
        }

        return callback(dialog.delegate(sessionAttributes, slots));

    }else if(_.eq(event.invocationSource, 'FulfillmentCodeHook')){

        if(_.eq(confirmationStatus, 'None')){
            return callback(dialog.confirmIntent(sessionAttributes, intentName, slots, 'Would you like me to get your a random inspirational quote?', dialog.buildResponseCard('Select option below:', 'Options', [{text: 'Great! Inspire me!', value: "Yes"}, {text: "No thank you!", value: "No"}])))
        }else if(_.eq(confirmationStatus, 'Confirmed')){
            let response = await quoteService.getQuote();
            if(response.success){
                return callback(dialog.close(sessionAttributes, 'Fulfilled', 'Thanks! Here is your inspirational quote: \n\n\n ' + response.quote.text));
            }else {
                return callback(dialog.close(sessionAttributes, 'Failed', 'Bummer! looks my brain is not that smart at all, let\'s try again!'));
            }
        }else if(_.eq(confirmationStatus, 'Denied')){
            return callback(dialog.close(sessionAttributes, 'Failed', 'Thanks for taking your time chatting to me! Feel free to chat to me again to get inspired.'));

        }

    }

}
