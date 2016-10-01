const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static("admin"));

app.get('/published', function (req, res) {
  let posts = require('./publish.json');
  res.json(posts);
});

app.post('/update', function(req, res) {
  let saveData = { published: req.body.data };
  fs.writeFile('./publish.json', JSON.stringify(saveData), function(err) {
    res.json({ error: err });
  });
});

app.get('/unpublished', function(req, res) {
  let publishedPosts = Array.from(require('./publish.json').published);
  let posts = [];
  fs.readdir(__dirname + '/posts/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
      if (f.indexOf('.md') != -1) {
        let postUrl = 'posts/' + f.replace(/\.md/, '.html');
        let isPublished = publishedPosts.findIndex((e) => {
          return e.url === postUrl;
        });
        if (isPublished == -1) {
          let fileData = fs.readFileSync(__dirname + '/posts/' + f, { encoding: 'utf8' });
          if (fileData) {
            let lines = fileData.split('\n');
            if (lines.length > 0) {
              let title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '').trim();
              let desc = lines.slice(1).join('').substr(0, 300).replace(/#/g, '') + '...';
              posts.push({
                title: title,
                url: postUrl,
                desc: desc
              });
            }
          }
        }
      }
    });
    res.json({ unpublished: posts });
  });
});

console.log("Server is running at: http://localhost:3000");
app.listen(3000);
