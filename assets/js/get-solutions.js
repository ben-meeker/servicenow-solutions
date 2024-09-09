(function(){
    const response = fetch('https://api.github.com/repos/ben-meeker/servicenow-solutions/contents/solutions');
    const data = response.json();
    var list = document.getElementById('solutions-ul')

    for (let file of data) {
      if (file.name == "index.html") {
        continue;
      };
      var li = document.createElement('li');
      li.setAttribute('class','important-link');
      var a = document.createElement('a');
      a.setAttribute('href',`/solutions/${file.name}`);
      li.appendChild(a);
      li.innerHTML = `${file.name}`;
      list.appendChild(li);
    }
})();