const http = require('http');

const express = () => {
    const mapping = {};

    const augmentResponseObject = (res) => {
        res.send = (message) => {
            res.write(message);
            res.write('\n');
            res.end();
        };
    }

    const server = http.createServer((req, res) => {
        augmentResponseObject(res);

        const key = `${req.method}:${req.url}`;
        console.log(key);
        const handler = mapping[key];

        if (!handler) {
            res.statusCode = 404;
            res.write('Not found\n');
            res.end();
            return;
        }

        handler(req, res);
    });

    server.listen(3000, () => {
        console.log('Listening to port 3000...')
    });

    this.get = (path, callback) => {
        console.log(`Registering path ${path} for get`);
        mapping[`GET:${path}`] = callback;
    };

    this.post = (path, callback) => {
        console.log(`Registering path ${path} for get`);
        mapping[`POST:${path}`] = callback;
    };

    return this;
};

module.exports = express;