var section = document.querySelectorAll("main > div");
var sections = {};
var i = 0;

section.forEach(function(e) {
    sections[e.id] = e.offsetTop - 95;
  });

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelectorAll('.menuitem').forEach(function(x){
            x.classList.remove('active')
        });
        document.querySelector('a[href*=' + i + ']').classList.add('active');
      }
    }
  };