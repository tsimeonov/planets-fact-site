"use strict";
// Mobile menu
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("open");
  // hamburger.style.display = "none";
  //   document.body.style.backgroundColor = "#979797";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
  // hamburger.style.display = "block";
  //   document.body.style.backgroundColor = "#fff";
});
