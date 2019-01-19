let previousPos = 0;

export function scrollBarPosition(menu) {
  if(previousPos > document.documentElement.scrollTop) {
    if(document.documentElement.scrollTop === 0) {
      if(menu.className.search('fixed-menu') != -1) {
        menu.classList.remove('fixed-menu');
      }
    }
    else if(menu.className.search('fixed-menu') == -1) {
      menu.classList.add('fixed-menu');
    }
  }
  else {
    if(menu.className.search('fixed-menu') != -1) {
      menu.classList.remove('fixed-menu');
    }
  }
  previousPos = document.documentElement.scrollTop;
}

export function responsiveNavClickExpand(menu, navIcon) {
  console.log(this);
  console.log(menu.classList);
  console.log(menu.classList.contains("responsive"));
  if(!menu.classList.contains("responsive")) {
    menu.classList.add("responsive");
  }
  else {
    menu.classList.remove("responsive");
  }

  if(!navIcon.classList.contains('open')) {
    navIcon.classList.add('open');
  }
  else {
    navIcon.classList.remove('open');
  }
}