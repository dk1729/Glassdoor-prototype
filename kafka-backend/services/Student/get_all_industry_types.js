var connection = require('../../mysql_database');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const client = require('../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => 
{
    let response = {};
    try {
        let the_query = "SELECT toi_type FROM type_of_industries";
        console.log(the_query);
        let redis_result = await get('get_all_industries');
        
        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            console.log(rows);
            if(rows.length > 0)
            {
                response.code = 200;
                response.data = JSON.stringify(rows);
                set('get_all_industries', JSON.stringify(rows));
            }
            else
            {
                response.code = 204;
            }
            callback(null, response)
        }
        else{
            console.log("Fetching from redis");
            console.log(redis_result)
            response.code = 200;
            response.data = redis_result;
            callback(null, response)
        }
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;