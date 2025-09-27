// DOM element selection
const planetLinks = document.querySelectorAll('nav ul li a, .menubar ul li a');
const planetImage = document.querySelector('.image img');
const planetName = document.querySelector('.info h1');

const mobileNav = document.querySelector('.hamburger');
const navbar = document.querySelector('.menubar');
// const header = document.querySelector('.header');

const toggleNav = () => {
	navbar.classList.toggle('active');
	mobileNav.classList.toggle('hamburger-active');
	// header.classList.toggle('header-border-active');
};
mobileNav.addEventListener('click', () => toggleNav());
