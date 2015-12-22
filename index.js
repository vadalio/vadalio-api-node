var fs      = require('fs')
var path    = require('path')
var express = require('express')
var app     = express()

var FUNCTIONS_FOLDER = path.join(__dirname, 'functions')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/check', function(request, response) {
  response.send('200 OK')
})

fs.readdirSync(FUNCTIONS_FOLDER).forEach(function (file) {
  var name = file.split('.')[0]

  app.all('/run/' + name, require(path.join(FUNCTIONS_FOLDER, file)))
})

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'))
})
