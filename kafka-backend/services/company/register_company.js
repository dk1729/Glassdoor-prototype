const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    console.log("~~~~~~~~~~~~~~~ Message ~~~~~~~~~~~~~~~~~`", message);
    var query = "SELECT * FROM companies WHERE company_email = '"+ message.company_email +"' OR company_name = '"+ message.company_name +"'";
    connection.query(query, (err, company) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.date = err;
            console.log("~!!!!!!!!!!!!!!!!!!!!!!!!!!! Error !!!!!!!!!!!!!!!!!!!!!!!!", response);
            callback(null, response);
        }
        else if(company.length > 0)
        {
            response.code = 299;
            callback(null, response);
        }
        else
        {
            bcrypt.hash(message.password, 10, (err, hash) => {
                if(err)
                {
                    response.code = 500;
                    response.date = err;
                    console.log("~!!!!!!!!!!!!!!!!!!!!!!!!!!! Error !!!!!!!!!!!!!!!!!!!!!!!!", response);
                    callback(null, response);
                }
                else
                {
                    message.password = hash;
                    var insertQuery = "INSERT INTO companies SET " + mysql.escape(message); 
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~Creating~~~~~~~~~~~~~~~~~~~~~~~~~~", message)
                    connection.query(insertQuery, (err, result) => {
                        if(err)
                        {
                            response.code = 500;
                            response.date = err;
                            console.log("~!!!!!!!!!!!!!!!!!!!!!!!!!!! Error !!!!!!!!!!!!!!!!!!!!!!!!", response);
                            callback(null, response);
                        }
                        else
                        {
                            console.log("~~~~~~~~~~~~~~~~~~~` created ~~~~~~~~~~~~~~~~~~~~~~")
                            response.code = 200;
                            callback(null, response);
                        }
                    })
                }
            });
 
        }

    })
}
exports.handle_request = handle_request;