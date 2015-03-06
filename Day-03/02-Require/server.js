var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

var server = http.createServer(function(req,res){
    req.url = req.url === "/" ? 'index.html' : req.url;
    var urlObj = url.parse(req.url);
    var resourceName = urlObj.pathname;
    var resourcePath = path.join(__dirname,resourceName);
    if (fs.existsSync(resourcePath)){
        fs.createReadStream(resourcePath, {encoding : 'utf8'}).pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});
console.log("server running on port 8080!");
server.listen(8080);
