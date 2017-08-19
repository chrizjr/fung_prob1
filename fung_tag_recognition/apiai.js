var apiai = require('apiai');

var app = apiai("a0e3d49509684e11a150e8afff2022e8");

var request = app.textRequest('2017 Summer is here!', {
    sessionId: '2'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();


