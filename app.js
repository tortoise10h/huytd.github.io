let express = require('express');
let app = express();

app.use(express.static("admin"));

app.get('/published', function (req, res) {
  let posts = require('./publish.json');
  res.json(posts);
});

app.listen(3000);
