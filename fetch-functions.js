var fs    = require('fs')
var path  = require('path')
var https = require('https')

var functions         = []
var FUNCTIONS_FOLDER  = path.join(__dirname, 'functions')

try {
  functions = JSON.parse(process.env.FUNCTIONS_LIST)
} catch(e) {
  console.error('FUNCTIONS_LIST is not a valid JSON array')
  process.exit(1)
}

function downloadFunction(url) {
  var urlParts = url.split('/')
  var filename = urlParts[urlParts.length - 1]

  var request = https.get(url, function(response) {
    if (response.statusCode === 200) {
      var file = fs.createWriteStream(path.join(FUNCTIONS_FOLDER, filename))
      response.pipe(file)
    }

    request.setTimeout(12000, function () {
      request.abort()
    })
  })
}

functions.forEach(downloadFunction)
