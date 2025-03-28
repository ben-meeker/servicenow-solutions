function searchDrop() {
    document.getElementById("search-dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.search')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function mySearch() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("solutions-ul");
    var li = ul.getElementsByTagName("li");

    for (var i = 0; i < li.length; i++) {
        var card = li[i].querySelector('.solution-card');
        if (!card) continue;

        var title = card.querySelector('.solution-title');
        var type = card.querySelector('.badge-type');
        var creator = card.querySelector('.badge-creator');
        
        var searchText = [
            title ? title.textContent : '',
            type ? type.textContent : '',
            creator ? creator.textContent : ''
        ].join(' ').toUpperCase();

        if (searchText.indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}