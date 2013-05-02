var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

var dbox  = require("dbox")
var dboxApp   = dbox.app({ "app_key": "vxejkxa1gqqea6w", "app_secret": "q8kp95i3qwa4c0s", "root": "dropbox" })

var http = require("http")
var request = require("request")

// dboxApp.requesttoken(function(status, request_token){
//   console.log(request_token)
// })

// var request_token = { oauth_token_secret: 'ea7Y0oKrzGSnImv6',
//   oauth_token: '4uwGJtE94B5JOmfc',
//   authorize_url: 'https://www.dropbox.com/1/oauth/authorize?oauth_token=4uwGJtE94B5JOmfc' }

// dboxApp.accesstoken(request_token, function(status, access_token){
//   console.log(access_token)
// })

// access token for my account
var access_token = { oauth_token_secret: 'sutu06dvwt37zt2',
  oauth_token: 'j0vxrvox63nv2r8',
  uid: '5888945' }

var client = dboxApp.client(access_token)

// client.account(function(status, reply){
//   console.log('account info')
//   console.log(reply)
// })

var mediaUrls = {};

app.get('/play/*', function(req, res){
    var filePath = req.params.join('/');
    if (mediaUrls[filePath])
    {
        var x = request(mediaUrls[filePath])
        req.pipe(x)
        x.pipe(res)
        return;
    }
    client.media(req.params.join('/'), function(status, reply){
        console.log(reply)
        mediaUrls[filePath] = reply.url
        var x = request(reply.url)
        req.pipe(x)
        x.pipe(res)

    });
    // client.get(req.params.join('/'), function(status, reply, metadata){
    //     res.type(metadata.mime_type)
    //     res.send(reply)
    // })
});

app.listen(3000);
console.log('Listening on port 3000');
