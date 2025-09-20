const mobileNav = document.querySelector('.hamburger');
const navbar = document.querySelector('.menubar');
const header = document.querySelector('.header');

const toggleNav = () => {
	navbar.classList.toggle('active');
	mobileNav.classList.toggle('hamburger-active');
	// Toggle a class on the header insted of directly changing the style
	header.classList.toggle('header-border-active');
};
mobileNav.addEventListener('click', () => toggleNav());
