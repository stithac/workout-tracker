// Dependencies
const path = require('path');

// Routes
module.exports = function(app) {
    // home route
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    // exercise route
    app.get('/exercise', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });

    //stats route
    app.get('/stats', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/stats.html'));
    });
  };