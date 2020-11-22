const navbarToggler = document.querySelector(".navbar-toggler");

navbarToggler.addEventListener("click", () => {

    if(window.innerWidth < 992){
        gsap.fromTo(".navbar-nav .nav-item", {opacity: 0}, {opacity: 1, ease: "slow", stagger:{
            each: 0.3
          }
        
          });
    
    }
})


