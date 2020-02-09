echo "<link href='_css/style.css' rel='stylesheet'/><div id='content' class='homepage'><h1>$ ls /home/huy/notes/</h1><ul>"
for file in *.html
do
  if [[ $file =~ .*index.html.* ]]; then
   echo ""
  else
    echo "<li><a href='$file'>$file</a></li>"
  fi
done
echo "</ul></div>"
