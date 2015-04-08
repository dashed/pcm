var net = require('net');
var _ = require('lodash');

function parseData(chunk, idx) {
    return chunk.readInt16LE(idx*2);
}

var processData = function(chunk) {

    if(chunk == null || chunk.length <= 0 || chunk.length != 320)
        return;

    var sum = 0;
    var n = 160;
    while(n --> 0) {
        var val = parseData(chunk, n);
        sum += Math.pow(val, 2);
    }

    var rms = Math.sqrt(sum/160);
    var status = rms >= 90 ? "sound" : "no sound";

    console.log(status + "\r");
}

net.createServer(function (client) {
    client.on('data', _.throttle(processData, 100));
}).listen(3333);



var gpio = require('rpi-gpio');

gpio.setup(12, gpio.DIR_OUT, callback);

var on = false;

function callback(err) {

    if (err) throw err;

    on = !on;
    delayedWrite(12, on, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });

}

function delayedWrite(pin, value, callback) {
    setTimeout(function() {
        gpio.write(pin, value, callback);
    }, 200);
}



