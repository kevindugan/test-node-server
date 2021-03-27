'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const os = require('os');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.view('mainPage', {hostName: `${os.hostname}`});
        }
    });

    await server.start();
    await server.register(Vision);
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();