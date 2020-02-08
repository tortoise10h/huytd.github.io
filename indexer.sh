echo "<link href='_css/style.css' rel='stylesheet'/><div id='content'><h1>Huy's Notes</h1><ul>"
for file in *.html
do
  if [[ $file =~ .*index.html.* ]]; then
   echo ""
  else
    echo "<li><a href='$file'>$file</a></li>"
  fi
done
echo "</ul></div>"
