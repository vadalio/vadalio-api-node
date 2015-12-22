module.exports = function(req, res) {
  res.send('it works ' + process.env.MY_NAME)
}
