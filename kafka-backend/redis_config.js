var redis = require('redis');
var client = redis.createClient(6379, 'localhost', {no_ready_check: true});

//maxmemory: 1000mb and maxmemory-policy: allkeys-lfu
client.auth('password', function (err) {
    if (err){
      throw err;
    }
});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

module.exports = client;