var express = require('express');
var app = express();
var http = require('http');
var mod = require('./module');
var url = require('url');

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

app.use(express.static("public"));
app.use(express.static("views"));
//app.set('views', path.join(__dirname, 'other'));


app.get('/imagesearch/*', function (req, res) {

    var strUrl = req.url;
    //var query = strUrl.substr(13, strUrl.length);
    //console.log(query);
    var reqUrl = url.parse(strUrl, true);
    //console.log(reqUrl);
            /**
          search: '?offset=2',
          query: { offset: '2' },
          pathname: '/imagesearch/cat',
          path: '/imagesearch/cat?offset=2',
          href: '/imagesearch/cat?offset=2' 
                **/
    var offset = reqUrl.query.offset;
    var search = reqUrl.pathname.substr(13, reqUrl.pathname.length);
    console.log(offset + " && " + search);
    mod.searchAPI(search, offset, function(j) {
        if (j.hasOwnProperty("error")) { //end the functon here
            res.json(j);
        } else {
            mod.save(search, function() {
                res.send(j); //res.json(x) converts json to string 
            });
        }
    });
});

app.get('/last', function (req, res) {

    var strUrl = req.url;
    //var query = strUrl.substr(13, strUrl.length);
    //console.log(query);
    var reqUrl = url.parse(strUrl, true);
    //console.log(reqUrl);
            /**
          search: '?offset=2',
          query: { offset: '2' },
          pathname: '/imagesearch/cat',
          path: '/imagesearch/cat?offset=2',
          href: '/imagesearch/cat?offset=2' 
                **/
    var offset = reqUrl.query.offset;
    var search = reqUrl.pathname.substr(13, reqUrl.pathname.length);
    //console.log(offset + " && " + search);
    mod.last(function(info) {
        console.log(info);
        res.end(); //res.json(x) converts json to string 
    });
});

/**
<script>
  (function() {
    var cx = '009750306379990073273:acxgdtqm0fs';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>

**/