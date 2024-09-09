(async () => {
    const response = await fetch('https://api.github.com/repos/ben-meeker/servicenow-solutions/contents/solutions');
    const data = await response.json();
    var list = document.getElementById('solutions-ul')

    for (let file of data) {
      if (file.name == "index.html") {
        continue;
      };
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href',`/solutions/${file.name}`);
      a.innerHTML = `${file.name}`;
      li.appendChild(a);
      list.appendChild(li);
    }
})();