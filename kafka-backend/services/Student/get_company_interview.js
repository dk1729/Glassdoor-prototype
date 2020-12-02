var interviews = require('../../Models/interviewModel');

function handle_request(message, callback)
{
    interviews.find({company_id : "1"}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = result;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;