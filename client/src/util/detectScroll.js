let previousPos = 0;

export default function scrollBarPosition(menu) {
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
