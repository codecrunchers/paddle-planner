'use strict';

const getTides = require('./lib/tides');

module.exports.endpoint = (event, context, callback) => {
    getTides().then( (tides )=> { // eslint-disable-line arrow-body-style
        console.log(tides.entity)
            const response = {
                statusCode: 200,
                body: tides.entity,
            };

        callback(null,response)

    }        )
    .catch((error) => {
        callback(error, { success: false });
    });
};

