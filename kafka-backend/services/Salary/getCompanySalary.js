const salaries = require("../../Models/salaries");

function handle_request(msg, callback){
      console.log(msg)
      console.log("Getting Salary!")
  
      salaries.find({company_id : msg.company_id}, function(err,result, fields){
          if(err) throw err;
            console.log(result)
        var response={
            code:200,
            data:result
        }
          callback(null, response)
          console.log("After Callback!")
      })
  }
  
  exports.handle_request = handle_request;