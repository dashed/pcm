var net = require('net');
var _ = require('lodash');

var client = net.connect({
    port: 3333
}, function() {
    console.log('connected to arecord');
});

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

client.on('data', _.throttle(processData, 100));

