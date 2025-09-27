// DOM element selection
const planetLinks = document.querySelectorAll('nav ul li a, .menubar ul li a');
const planetImage = document.querySelector('.image img');
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
		(p) => p.name.LowerCase() === name.toLowerCase()
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

	// Handle image updates
	// The main planet image only changes for geology view
	if (currentView === 'geology') {
		// We need to show both plantes and the geology image
		const existingGeologyImg = document.querySelector('.geology-img');
	}
}

const toggleNav = () => {
	navbar.classList.toggle('active');
	mobileNav.classList.toggle('hamburger-active');
	// header.classList.toggle('header-border-active');
};
mobileNav.addEventListener('click', () => toggleNav());
