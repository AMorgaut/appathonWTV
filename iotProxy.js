const teamNumber = 10;

var http = require('http');

var server = http.createServer(function (req, res) {
    var body = [];
    console.log(req.path);
    req.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        var newReq = http.request({
            method: 'POST',
            hostname: '52.59.237.209',
            path: 'iot' + teamNumber + '/commands',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        newReq.write(body);
        newReq.end();
        res.end('ok');
    });
});
server.on('clientError', function (err, socket) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);