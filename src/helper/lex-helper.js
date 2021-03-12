'use strict';

module.exports.elicitSlot = (event, slotName, message) => {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message: {
                contentType: 'PlainText',
                content: message
            },
            responseCard
        }

    };
}


module.exports.delegate = (sessionAttributes, slots) => {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots
        }
    }
};

module.exports.confirmIntent = (sessionAttributes, intentName, slots, message, responseCard) => {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            intentName,
            slots,
            message: {
                contentType: 'PlainText',
                content: message
            },
            responseCard
        }
    }
};

module.exports.close = function (sessionAttributes, fulfillmentState, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message: {contentType: 'PlainText', content: message},
            responseCard
        }
    };
};

module.exports.buildValidationResult = function (isValid, violatedSlot, messageContent) {
    if (messageContent == null) {
        return {
            isValid,
            violatedSlot,
        };
    }
    return {
        isValid,
        violatedSlot,
        message: messageContent
    };
}

module.exports.buildResponseCard = function (title, subTitle, options, imageUrl) {
    let buttons = null;
    if (options != null) {
        buttons = [];
        for (let i = 0; i < Math.min(5, options.length); i++) {
            buttons.push(options[i]);
        }
    }
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
        genericAttachments: [{
            title,
            subTitle,
            buttons,
            imageUrl
        }],
    };
};
