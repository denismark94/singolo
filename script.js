let section = document.querySelectorAll("main > div");
let sections = {};
let i = 0;

section.forEach(function(e) {
    sections[e.id] = e.offsetTop - 95;
  });

  window.onscroll = function() {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelectorAll('.menuitem').forEach(function(x){
            x.classList.remove('active')
        });
        document.querySelector('a[href*=' + i + ']').classList.add('active');
      }
    }
  };

const CAROUSEL = document.querySelector(".carousel");
const LEFTARROW = document.querySelector(".left-chev");
const RIGHTARROW = document.querySelector(".right-chev");
const CAROUSEL_LEFT = document.querySelector(".carousel-left");
const CAROUSEL_CENTER = document.querySelector(".carousel-center");
const CAROUSEL_RIGHT = document.querySelector(".carousel-right");

const set_listeners = () => {
  document.querySelectorAll(".iphone").forEach((phone)=>{
    phone.addEventListener('click', (event)=>{
      event.currentTarget.querySelector('.iphone-bg').classList.toggle('off');
    });
  });
};

set_listeners();

const moveLeft = () => {
  CAROUSEL.classList.add("slide-left");
  LEFTARROW.removeEventListener("click", moveLeft);
  RIGHTARROW.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add('slide-right');
  LEFTARROW.removeEventListener("click", moveLeft);
  RIGHTARROW.removeEventListener("click", moveRight);
};

LEFTARROW.addEventListener("click", moveLeft);
RIGHTARROW.addEventListener("click", moveRight);


CAROUSEL.onanimationend = (event) => {
  switch(event.animationName) {
    case "slide-left":
      CAROUSEL.classList.remove('slide-left');
      upd_left();
      break;
    case "slide-right":
      CAROUSEL.classList.remove('slide-right');
      upd_right();
      break;
  }
  
  LEFTARROW.addEventListener("click", moveLeft);
  RIGHTARROW.addEventListener("click", moveRight);


};

const upd_left = () => {
  let left_html = CAROUSEL_LEFT.innerHTML;
  CAROUSEL_LEFT.innerHTML = CAROUSEL_CENTER.innerHTML;
  CAROUSEL_CENTER.innerHTML = CAROUSEL_RIGHT.innerHTML;
  CAROUSEL_RIGHT.innerHTML = left_html; 
  set_listeners(); 
}

const upd_right = () => {
  let center_html = CAROUSEL_CENTER.innerHTML;
  CAROUSEL_CENTER.innerHTML = CAROUSEL_LEFT.innerHTML;
  CAROUSEL_LEFT.innerHTML = CAROUSEL_RIGHT.innerHTML;
  CAROUSEL_RIGHT.innerHTML = center_html;
  set_listeners();
}


