//Navigation bar handling
let sections = document.querySelectorAll("main > div");
let section_positions = {};

sections.forEach(function(e) {
    section_positions[e.id] = e.offsetTop - 95;
});

window.onscroll = function() {
  let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  for (i in section_positions) {
    if (section_positions[i] <= scrollPosition) {
      document.querySelectorAll('.menuitem').forEach(function(x){
        x.classList.remove('active')
      });
      document.querySelector('a[href*=' + i + ']').classList.add('active');
    }
  }
};

//Phone carousel handling
const CAROUSEL = document.querySelector(".carousel");
const LEFTARROW = document.querySelector(".left-chev");
const RIGHTARROW = document.querySelector(".right-chev");
const CAROUSEL_LEFT = document.querySelector(".carousel-left");
const CAROUSEL_CENTER = document.querySelector(".carousel-center");
const CAROUSEL_RIGHT = document.querySelector(".carousel-right");

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

const set_phone_listeners = () => {
  document.querySelectorAll(".iphone").forEach((phone)=>{
    phone.addEventListener('click', (event)=>{
      event.currentTarget.querySelector('.iphone-bg').classList.toggle('off');
    });
  });
};

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
  set_phone_listeners(); 
}

const upd_right = () => {
  let center_html = CAROUSEL_CENTER.innerHTML;
  CAROUSEL_CENTER.innerHTML = CAROUSEL_LEFT.innerHTML;
  CAROUSEL_LEFT.innerHTML = CAROUSEL_RIGHT.innerHTML;
  CAROUSEL_RIGHT.innerHTML = center_html;
  set_phone_listeners();
}
set_phone_listeners();

prev = null;
ARTS = document.querySelectorAll('.arts img');
ARTS.forEach((art)=>{
  art.addEventListener('click', (event)=>{
    if (event.target.classList.contains('active')) 
      event.target.classList.remove('active');  
    else {
      event.target.classList.add('active');
      if(prev) prev.classList.remove('active');
      prev = event.target;
    }
  })
})


function shuffle(arts){
  return new Promise((resolve)=>{
    children = Array.from(arts.children);
    arts.innerHTML = '';
    for(let i = 0; i < children.length; i++){  
      do {j = Math.floor(Math.random() * children.length);
      } while (i == j);
      tmp = children[i];
      children[i] = children[j];
      children[j] = tmp;
    }
    children.forEach(child => {
      arts.appendChild(child);
    });
    resolve();
  });
}
counter = 0;
function hide_tiles(event) {
  return new Promise((resolve)=>{
    switch(event.animationName){
      case 'fade-out':
          event.target.classList.remove('fade-out');
          event.target.classList.add('invisible');  
          counter++;
          if (counter == ARTS.length)
          {
            counter = 0;
            resolve();
          }
          break;
      case 'fade-in':
        event.target.classList.remove('fade-in');
        break;
    };
  });
}

function show_tiles(arts) {
  arts.forEach((art)=>{
    art.classList.remove("invisible");
    art.classList.add('fade-in');
  }) 
}


function set_tiles_listeners(arts){
  arts.forEach((art)=>{
    art.onanimationend = ((event)=>hide_tiles(event)
    .then(()=>shuffle(document.querySelector('.arts')))
    .then(()=>show_tiles(ARTS)));
  });
}


set_tiles_listeners(ARTS);
const TABS = document.querySelectorAll('.portfolio .common a')
TABS.forEach((button) => {
  button.addEventListener('click',(event)=>{
    TABS.forEach((tab)=>tab.classList.remove('active'));
    event.currentTarget.classList.add('active');
    ARTS.forEach((art)=>{art.classList.add("fade-out");});
    hide_tiles(ARTS);
  })
});


let form  = document.querySelector(".quote_form");
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  let form_subject = event.target.querySelector("#subject");
  let form_description = event.target.querySelector("#data");
  let popup_subject = "No subject";
  let popup_description = "No desription";
  if (form_subject.value) popup_subject = "Subject: " + form_subject.value;
  if (form_description.value) popup_description = "Description: " + form_description.value.substr(0,10);
  let popup_subject_field = document.querySelector('.popup #subject');
  let popup_description_field = document.querySelector('.popup #description');
  popup_subject_field.textContent = popup_subject;
  popup_description_field.textContent = popup_description;
  toggle_popup();
})

let toggle_popup = (e)=>{
  let background = document.querySelector(".background");
  let btn = document.querySelector(".popup_button");
  if (e)
  {
    e.stopPropagation();
    clear_forms();
    if (e.target == btn || e.target == background)
      background.classList.toggle('active');
  }
  else
    background.classList.toggle('active');
}

document.querySelector('.background').addEventListener("click", (event)=>toggle_popup(event));
document.querySelector('.popup_button').addEventListener("click", (event)=>toggle_popup(event));


let clear_forms = ()=>{
  document.querySelector('#name').value = '';
  document.querySelector("#email").value = '';
  document.querySelector("#subject").value = '';
  document.querySelector("#data").value = '';
}





