
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("navbtn");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
   });
