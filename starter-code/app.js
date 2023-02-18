"use strict";
// Mobile menu
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("open");
  //   document.body.style.backgroundColor = "#979797";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
  //   document.body.style.backgroundColor = "#fff";
});

anime({
  targets: ".square",
  translateX: 250,
});
