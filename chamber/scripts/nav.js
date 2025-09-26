// hamburger button on small screen
const ham = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");
const cta = document.querySelector("#cta");

ham.addEventListener("click", hamToggle);

function hamToggle()
{
    ham.classList.toggle("active");
    mainNav.classList.toggle("active");
    if (mainNav.classList.contains("active")) {
        mainNav.style.display = "block";
    } else {
        mainNav.style.display = "none";
    }
};

// reset nav if window is changed above or below 320 px. 

function largeNav() {
    if (window.innerWidth >= 450) {
        mainNav.style.display = "flex";
    } else {
        if (mainNav.classList.contains("active")) {
            ham.classList.remove("active");
            mainNav.classList.remove("active");
            mainNav.style.display = "none";
        }
        else {
            mainNav.style.display = "none";
        }
    }
}

window.onresize = largeNav;