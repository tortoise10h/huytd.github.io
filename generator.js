var fs = require('fs');
var marked = require('./js/marked.js');

var templateHtml = '';
var indexTemplateHtml = '';

console.log('Loading template...');
fs.readFile('template.html', function (err, data) {
  if (err)
    throw err;
  if (data) {
  	templateHtml = data.toString('utf8');
  	console.log('DONE');
  }
});

console.log('Loading index template...');
fs.readFile('indexTemplate.html', function (err, data) {
  if (err)
    throw err;
  if (data) {
  	indexTemplateHtml = data.toString('utf8');
  	console.log('DONE');
  }
});

console.log('Generating static files...');
fs.readdir(__dirname + '/posts/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        if (f.indexOf('.md') != -1) {
        	var htmlOutput = __dirname + '/posts/' + f.replace('.md', '.html');
	        var postContent = '';
	        var htmlContent = '';
	        var metaData = '';
	        fs.readFile(__dirname + '/posts/' + f, function (err, data) {
			  if (err)
			    throw err;
        console.log("Reading: ", f);
			  if (data) {
			  	var markdownPost = data.toString('utf8');
			  	var lines = markdownPost.split('\n');
			  	var title = '';
			  	if (lines.length > 0) {
			  		title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '');
			  		if (lines[lines.length - 6].indexOf('<meta') == 0) {
			  			metaData = lines.slice(lines.length - 6).join('\n');
			  			markdownPost = markdownPost.split('\n');
			  			markdownPost.splice(markdownPost.length - 6);
			  			markdownPost = markdownPost.join('\n');
			  		}
			  	}
			  	postContent = marked(markdownPost);
			  	htmlContent = templateHtml.replace('{%content%}', postContent);
			  	htmlContent = htmlContent.replace('{%title%}', title);
			  	htmlContent = htmlContent.replace('{%meta%}', metaData);
			  	htmlContent = htmlContent.replace('{%posturl%}', 'http://huytd.github.io/posts/' + f.replace('.md', '.html'));

			  	fs.writeFile(htmlOutput, htmlContent, function (err) {
				     if (err)
				       throw err;
				     else
				     	console.log('>>', htmlOutput);
				});
			  }
			});
        }
    });
});

console.log('Generating index page...');
fs.readdir(__dirname + '/posts/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        if (f.indexOf('home.md') != -1) {
        	var htmlOutput = __dirname + '/index.html';
	        var postContent = '';
	        var htmlContent = '';
	        var metaData = '';
	        fs.readFile(__dirname + '/posts/' + f, function (err, data) {
			  if (err)
			    throw err;
			  if (data) {
			  	var markdownPost = data.toString('utf8');
			  	var lines = markdownPost.split('\n');
			  	var title = '';
			  	if (lines.length > 0) {
			  		title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '');
			  		if (lines[lines.length - 6].indexOf('<meta') == 0) {
			  			metaData = lines.slice(lines.length - 6).join('\n');
			  			markdownPost = markdownPost.split('\n');
			  			markdownPost.splice(markdownPost.length - 6);
			  			markdownPost = markdownPost.join('\n');
			  		}
			  	}
			  	postContent = marked(markdownPost);
			  	htmlContent = indexTemplateHtml.replace('{%content%}', postContent);
			  	htmlContent = htmlContent.replace('{%title%}', title);
			  	htmlContent = htmlContent.replace('{%meta%}', metaData);
			  	htmlContent = htmlContent.replace('{%posturl%}', 'http://huytd.github.io');

			  	fs.writeFile(htmlOutput, htmlContent, function (err) {
				     if (err)
				       throw err;
				     else
				     	console.log('>>', htmlOutput);
				});
			  }
			});
        }
    });
});

