window.addEventListener('scroll', function(){
  let navbar = document.querySelector('.navbar');
  if(this.window.scrollY > 20){
    navbar.classList.add('scrolled')
  }else{
    navbar.classList.remove('scrolled')
  }
});

document.querySelector("#to-top").addEventListener(
  "click",
  () => {
    let TopInterval = setInterval(() => {
      let ArrowTop =
        document.documentElement.scrollTop > 0
          ? document.documentElement
          : document.body;

      if (ArrowTop.scrollTop > 0) {
        ArrowTop.scrollTop = ArrowTop.scrollTop - 50;
      }

      if (ArrowTop.scrollTop <= 0) {
        clearInterval(TopInterval);
      }
    }, 10);
  },
  false,
);

function showscroll() {
  let TopButton = document.getElementById("to-top");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    TopButton.classList.add("show");
  } else {
    TopButton.classList.remove("show");
  }
}

window.onscroll = () => {
  showscroll();
};

const menuBtn = document.getElementById('menu_btn')
const navLinks = document.getElementById('nav_links')
const menuIcon = document.querySelector('i');

menuBtn.addEventListener('click',(e)=> {
  navLinks.classList.toggle('open')

  const isOpen = navLinks.classList.contains('open')
  menuIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line')
})