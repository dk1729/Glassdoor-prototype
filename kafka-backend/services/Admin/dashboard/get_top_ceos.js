const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let the_query = `SELECT
                            company_id, company_name, company_ceo_first_name, company_ceo_last_name, company_avg_ceo_approval_rating, company_profile_photo
                            FROM companies
                            ORDER BY company_avg_ceo_approval_rating DESC
                            LIMIT 10;`

        let redis_result = await get('get_top_ceos');

        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            set('get_top_ceos', JSON.stringify(rows));
            response.code = 200;
            response.data = JSON.stringify(rows);
            callback(null, response)
        }
        else{
            console.log("Fetching from redis");
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