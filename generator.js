var fs = require('fs');
var marked = require('./js/marked.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // IMPORTANT, because we do MathJax before markdown,
                  //            however we do escaping in 'CreatePreview'.
  smartLists: true,
  smartypants: false
});

var templateHtml = '';
var indexTemplateHtml = '';

console.log('Loading template...');
templateHtml = fs.readFileSync('template.html', { encoding: 'utf8' });
console.log('Loading index template...');
indexTemplateHtml = fs.readFileSync('indexTemplate.html', { encoding: 'utf8' });

console.log(process.argv);

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


        // Custom components
			  	markdownPost = markdownPost.replace(/<cover>/g, '<div class="cover" style="background-image:url(');
			  	markdownPost = markdownPost.replace(/<\/cover>/g, '"></div><div class="cover-holder"></div>');
			  	markdownPost = markdownPost.replace(/<math>/g, '<pre class="math">$$');
			  	markdownPost = markdownPost.replace(/<\/math>/g, '$$</pre>');

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
var publishedPosts = Array.from(require('./publish.json').published);
var htmlOutput = __dirname + '/index.html';
var postContent = "# Nơi tổng hợp những ghi chép linh tinh\n\n";
var htmlContent = '';

for (var i = publishedPosts.length - 1; i >= 0; i--) {
  postContent += "\n---\n[" + publishedPosts[i].title  + "](" + publishedPosts[i].url + ")\n\n" + publishedPosts[i].desc + "\n";
}

htmlContent = indexTemplateHtml.replace('{%content%}', marked(postContent));
htmlContent = htmlContent.replace('{%title%}', 'Nơi tổng hợp những ghi chép linh tinh');
htmlContent = htmlContent.replace('{%meta%}', '');
htmlContent = htmlContent.replace('{%posturl%}', 'http://huytd.github.io');

fs.writeFile(htmlOutput, htmlContent, function (err) {
  if (err)
    throw err;
  else
    console.log('>>', htmlOutput);
});
