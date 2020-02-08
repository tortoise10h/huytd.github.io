echo "<link href='_css/style.css' rel='stylesheet'/><ul>"
for file in *.html
do
  if [[ $file =~ .*index.html.* ]]; then
   echo ""
  else
    echo "<li><a href='$file'>$file</a></li>"
  fi
done
echo "</ul>"
