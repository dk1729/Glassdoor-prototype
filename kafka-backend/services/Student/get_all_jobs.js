const conn = require('../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = "SELECT * FROM jobs";
        let redis_key = "get_all_jobs";
        let redis_result = await get(redis_key);

        if (redis_result == null) {
            console.log("SQL result");
            let rows = await query(the_query);
            let stringed_rows = JSON.stringify(rows);
            set(redis_key, stringed_rows);
            response.code = 200;
            response.data = stringed_rows;
            callback(null, response);
        } else {
            console.log("Redis result");
            response.code = 200;
            response.data = redis_result;
            callback(null, response);
        }
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;

// function handle_request(message, callback)
// {
//     var query = "SELECT * FROM jobs";
//     connection.query(query, (err, jobs) => {
//         var response = {};
//         if(err)
//         {
//             response.code = 500;
//             response.data = err
//         }
//         else 
//         {
//             response.code = 200;
//             response.data = jobs
//         }
//         callback(null, response);
//     })
// }
// exports.handle_request = handle_request;