// var http = require('http');
// var server = http.createServer();
// var settings = require('./settings');
// 
// server.on('request', function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('hello world');
//   res.end();
// });
// server.listen(settings.port, settings.host);
// console.log("server listening...");


//Switchを活用してURLに対してレスポンスを割振る
// var http = require('http');
// var server = http.createServer();
// var settings = require('./settings');
// 
// server.on('request', function(req, res) {
//   switch (req.url) {
//     case '/about' :
//       msg = "about this page";
//       break;
//     case '/profile' :
//       msg = "about me";
//       break;
//     default :
//       msg = 'wrong page';
//       break;
//   }
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write(msg);
//   res.end();
// });
// server.listen(settings.port, settings.host);
// console.log("server listening...");

//HTMLファイルを読み込む
// var http = require('http'),
//     fs = require ('fs');
// var server = http.createServer();
// var settings = require('./settings');

// server.on('request', function(req, res) {
//   fs.readFile(__dirname + '/html/hello.html', 'utf-8', function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.write("not found");
//       return res.end();
//     }
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//   });
// });
// server.listen(settings.port, settings.host);
// console.log("server listening...");

//ejsを使ったテンプレート
// var http = require('http'),
//     fs = require ('fs'),
//     ejs = require('ejs');
// var server = http.createServer();
// var settings = require('./settings');
// var template = fs.readFileSync(__dirname + '/html/hello.ejs', 'utf-8');
// var n = 0;
// 
// server.on('request', function(req, res) {
//   n++;
//       var data = ejs.render(template, {
//         title: "hello",
//         content: "<strong>World!</strong>",
//         n: "Page Views " + n
//       });
// 
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//   });
// 
// server.listen(settings.port, settings.host);
// console.log("server listening...");

//BBS
var http = require('http'),
    fs   = require ('fs'),
    ejs  = require('ejs'),
    qs   = require('querystring');
    
var server   = http.createServer();
var settings = require('./settings');
var template = fs.readFileSync(__dirname + '/html/bbs.ejs', 'utf-8');
var posts    = [];

function renderForm(posts, res) {
  var data = ejs.render(template, {
    posts: posts
  });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
}

server.on('request', function(req, res) {
  if (req.method === 'POST') {
    req.data = "";
    req.on("readable", function() {
      req.data += req.read();
    });
    req.on("end", function() {
      var query = qs.parse(req.data);
      posts.push(query.name);
      renderForm(posts, res);
    });
  } else {
    renderForm(posts, res);
  }
});

server.listen(settings.port, settings.host);
console.log("server listening...");