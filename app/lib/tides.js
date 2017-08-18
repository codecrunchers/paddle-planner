'use strict';

var rest = require('rest');

module.exports = (to, subject, body) => {
    return new Promise((resolve, reject) => {
        rest("https://jsonplaceholder.typicode.com/posts/1").then(
                function(response) {
                    console.log('response: ', response);
                    resolve(response);

                },
                function(response) {
                    console.error('response error: ', response);
                    reject(response)
                });
    });
};
