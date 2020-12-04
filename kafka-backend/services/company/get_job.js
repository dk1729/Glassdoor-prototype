var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM glassdoor.jobs where company_id="+ message.company_id +";";
    connection.query(query, (err, jobs) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err
        }
        else 
        {
            response.code = 200;
            response.data = jobs
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;