require('dotenv').config();
var PORT = process.env.PORT || "3001";

app = require("./app.js").app

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("App listening at http://%s:%s", host, port)
})
