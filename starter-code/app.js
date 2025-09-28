// DOM element selection
const planetLinks = document.querySelectorAll('nav ul li a, .menubar ul li a');
const planetImage = document.querySelector('.planet-img');
const planetName = document.querySelector('.info h1');
const planetDescription = document.querySelector('.info p');
const wikiLink = document.querySelector('.info div a');
const rotationTime = document.querySelector('.rotation span');
const revolutionTime = document.querySelector('.revolution span');
const radius = document.querySelector('.radius span');
const avgTemp = document.querySelector('.avg-temp span');

const overviewBtn = document.querySelectorAll('.info > div + div > button')[0];
const structureBtn = document.querySelectorAll('.info > div + div > button')[1];
const geologyBtn = document.querySelectorAll('.info > div + div > button')[2];

const mobileNav = document.querySelector('.hamburger');
const navbar = document.querySelector('.menubar');
// const header = document.querySelector('.header');

// State

let planetsFunction = [];
let currentPlanet = [];
let currentView = 'overview'; // "overview" , "structure", "geology"

// Fetches planets data from the json file
async function fetchPlanetData() {
	try {
		const response = await fetch('./data.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status ${response.status}`);
		}
		planetsData = await response.json();
		// Load mercury by default
		updatePlanetInfo('Mercury');
	} catch (error) {
		console.log('Could not fetch planet data', error);
	}
}

// Update the page content with information for the selected planet
function updatePlanetInfo(name) {
	const planet = planetsData.find(
		(p) => p.name.toLowerCase() === name.toLowerCase()
	);
	if (!planet) return;

	currentPlanet = planet;
	currentView = 'overview'; // Reset to overview when changing planets

	planetName.textContent = planet.name;
	updateContent(); // Initial content update
	updateStats();
}

// Update the main description and image based on the current view

function updateContent() {
	if (!currentPlanet.name) return;

	planetDescription.textContent = currentPlanet[currentView].content;
	wikiLink.href = currentPlanet[currentView].source;

	// Always insure the main planet image is visible
	planetImage.style.display = 'block';

	const geologyImg = document.querySelector('.geology-img');

	// Handle image updates
	// The main planet image only changes for geology view
	if (currentView === 'geology') {
		// We need to show both plantes and the geology image
		// Set the main image to the base planet image (overview)
		planetImage.src = currentPlanet.images.planet;

		// Add the geology image on top if it doesn't exist
		if (!geologyImg) {
			const newGeologyImg = document.createElement('img');
			newGeologyImg.src = currentPlanet.images.geology;
			newGeologyImg.alt = `Surface geology of ${currentPlanet.name}`;
			newGeologyImg.classList.add('geology-img');
			planetImage.parentElement.appendChild(newGeologyImg);
		}
	} else {
		// For overview and structure, remove geology image if it exists
		const geologyImg = document.querySelector('.geology-img');
		if (geologyImg) {
			geologyImg.remove();
		}
		planetImage.style.display = 'block'; // show the main planet image
		planetImage.src =
			currentView === 'overview'
				? currentPlanet.images.planet
				: currentPlanet.images.internal;
	}

	updateActiveButton();
}

// Update the four stat boxes at the bottom of the page

function updateStats() {
	if (!currentPlanet.name) return;

	rotationTime.textContent = currentPlanet.rotation;
	revolutionTime.textContent = currentPlanet.revolution;
	radius.textContent = currentPlanet.radius;
	avgTemp.textContent = currentPlanet.temperature;
}

// Update the active state of overview / structure / geology buttons
function updateActiveButton() {
	overviewBtn.classList.remove('active-plantet-button');
	structureBtn.classList.remove('active-planet-button');
	geologyBtn.classList.remove('active-planet-button');

	if (currentView === 'overview') {
		overviewBtn.classList.add('active-planet-button');
	} else if (currentView === 'structure') {
		structureBtn.classList.add('active-planet-button');
	} else if (currentView === 'geology') {
		geologyBtn.classList.add('active-plantet-button');
	}
}

const toggleNav = () => {
	navbar.classList.toggle('active');
	mobileNav.classList.toggle('hamburger-active');

	// header.classList.toggle('header-border-active');
};

mobileNav.addEventListener('click', () => toggleNav());

// Event Listeners

// Add clicj event listeners to all planet links
planetLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const planetName = e.target.textContent;
		updatePlanetInfo(planetName);
		// If in mobile view close the menu after selection
		if (navbar.classList.contains('active')) {
			toggleNav();
		}
	});
});

// Event listeners for the overview, structure and geology button
overviewBtn.addEventListener('click', () => {
	currentView = 'overview';
	updateContent();
});

structureBtn.addEventListener('click', () => {
	currentView = 'structure';
	updateContent();
});

geologyBtn.addEventListener('click', () => {
	currentView = 'geology';
	updateContent();
});

// Initial load
document.addEventListener('DOMContentLoaded', fetchPlanetData);
