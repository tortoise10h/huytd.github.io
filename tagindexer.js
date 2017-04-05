const fs = require('fs');

let tagIndex = [];

fs.readdir(__dirname + '/posts/', function(err, files) {
  if (err) return;
  files.forEach(function(f) {
    if (f.indexOf('.md') != -1) {
      let contentBuffer = fs.readFileSync(__dirname + '/posts/' + f);
      let content = String(contentBuffer, 'utf8');
      let matches = content.match(/--@TAGS:(.*)\n/i);
      if (matches) {
        let keywords = matches[1].split(',');
        keywords.forEach((key) => {
          let keyword = key.trim();
          if (!tagIndex[keyword]) {
            tagIndex[keyword] = [];
          }
          if (tagIndex[keyword].indexOf(f) === -1) {
            tagIndex[keyword].push(f);
          }
        });
      }
    }
  });

  console.log('Result', tagIndex);
  let keys = Object.keys(tagIndex);
  let templateBuffer = fs.readFileSync('./indexTemplate.html');
  let templateSrc = String(templateSrc, 'utf8');
  keys.forEach((key) => {
    let posts = tagIndex[key];

    let urls = posts.reduce((str, post) => {
      let url = "https://huytd.github.io/posts/" + post.replace(".md", ".html");
      str += "<li><a href=''></a></li>";
    }, "");

    let keywordTemplate = templateSrc + "";
    keywordTemplate.replace("{%title%}", key);
    keywordTemplate.replace("{%meta%}", '');
  });
});

