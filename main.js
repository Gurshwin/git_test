 // Define airports
 const airports = [
    { name: "FAVG Airport", capacity: 3, planes: [] },
    { name: "FALE Airport", capacity: 4, planes: [] },
    { name: "FAPM Airport", capacity: 5, planes: [] },
];

// Create planes
const planes = [];
for (let i = 1; i <= 10; i++) {
    planes.push({ id: `Plane-${i}`, status: "Flying", destination: null });
}

// Weather conditions
const weatherConditions = ["Clear", "Rainy", "Foggy", "Stormy", "Windy"];
let currentWeather = "Clear";

// Emergency scenarios
const emergencies = ["Engine failure", "Medical emergency", "Low fuel"];

// Utility functions
const logElement = document.getElementById("log");
const dashboard = document.getElementById("dashboard");
const weatherElement = document.getElementById("weather");

function log(message) {
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    logElement.appendChild(logEntry);
    logElement.scrollTop = logElement.scrollHeight;
}

function updateWeather() {
    currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    weatherElement.textContent = `Current Weather: ${currentWeather}`;
}

function displayAirports() {
    dashboard.innerHTML = "";
    airports.forEach((airport) => {
        const airportDiv = document.createElement("div");
        airportDiv.className = "airport";
        airportDiv.innerHTML = `
            <h3>${airport.name}</h3>
            <p>Capacity: ${airport.capacity}</p>
            <p>Current Planes: ${airport.planes.length}</p>
        `;
        dashboard.appendChild(airportDiv);
    });
}

function landPlane(plane, airport) {
    if (airport.planes.length >= airport.capacity) {
        log(`⚠️ ${airport.name} is full! ${plane.id} cannot land.`);
        return;
    }

    if (currentWeather === "Stormy" || currentWeather === "Foggy") {
        log(`⚠️ ${plane.id} could not land at ${airport.name} due to bad weather.`);
        return;
    }

    log(`✅ ${plane.id} landed at ${airport.name}.`);
    plane.status = "Landed";
    airport.planes.push(plane);
    displayAirports();
}

function handleEmergency(plane) {
    const emergency = emergencies[Math.floor(Math.random() * emergencies.length)];
    log(`🚨 ${plane.id} is experiencing an emergency: ${emergency}!`);
}

function sendToAirport(plane, airport) {
    log(`✈️ ${plane.id} is flying to ${airport.name}...`);

    if (Math.random() < 0.2) {
        handleEmergency(plane);
        return;
    }

    setTimeout(() => landPlane(plane, airport), 2000);
}

function simulate() {
    displayAirports();
    updateWeather();

    const flyingPlanes = planes.filter((plane) => plane.status === "Flying");
    if (flyingPlanes.length === 0) {
        log("🏆 All planes have landed! Great job!");
        return;
    }

    const plane = flyingPlanes[Math.floor(Math.random() * flyingPlanes.length)];
    const airport = airports[Math.floor(Math.random() * airports.length)];

    sendToAirport(plane, airport);

    setTimeout(simulate, 5000);
}

// Start the simulation
log("🛫 Starting simulation...");
setInterval(updateWeather, 10000); // Update weather every 10 seconds
simulate();

// Populate manual control dropdowns
function populateControls() {
    const planeSelect = document.getElementById("planeSelect");
    const airportSelect = document.getElementById("airportSelect");

    planeSelect.innerHTML = "";
    airportSelect.innerHTML = "";

    planes.filter(p => p.status === "Flying").forEach(plane => {
        const option = document.createElement("option");
        option.value = plane.id;
        option.textContent = plane.id;
        planeSelect.appendChild(option);
    });

    airports.forEach(airport => {
        const option = document.createElement("option");
        option.value = airport.name;
        option.textContent = airport.name;
        airportSelect.appendChild(option);
    });
}

// Handle manual plane direction
function manualControl() {
    const planeId = document.getElementById("planeSelect").value;
    const airportName = document.getElementById("airportSelect").value;

    if (!planeId || !airportName) {
        log("⚠️ Select both a plane and an airport.");
        return;
    }

    const plane = planes.find(p => p.id === planeId);
    const airport = airports.find(a => a.name === airportName);

    if (plane && airport) {
        sendToAirport(plane, airport);
    }
}

setInterval(populateControls, 2000); // Update dropdowns periodically

// Add advanced weather effects
let windSpeed = 0;
let visibility = 100;

function updateWeather() {
    currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    windSpeed = Math.floor(Math.random() * 40); // Random wind speed between 0-40 knots
    visibility = Math.floor(Math.random() * 100); // Random visibility percentage

    weatherElement.innerHTML = `
        Current Weather: ${currentWeather}<br>
        Wind Speed: ${windSpeed} knots<br>
        Visibility: ${visibility}%
    `;
}

// Update landing conditions
function landPlane(plane, airport) {
    if (airport.planes.length >= airport.capacity) {
        log(`⚠️ ${airport.name} is full! ${plane.id} cannot land.`);
        return;
    }

    if (currentWeather === "Stormy" || visibility < 50 || windSpeed > 30) {
        log(`⚠️ ${plane.id} could not land at ${airport.name} due to dangerous conditions.`);
        return;
    }

    log(`✅ ${plane.id} landed at ${airport.name}.`);
    plane.status = "Landed";
    airport.planes.push(plane);
    displayAirports();
}

let successfulLandings = 0;
let emergencyResolved = 0;

function landPlane(plane, airport) {
    if (airport.planes.length >= airport.capacity) {
        log(`⚠️ ${airport.name} is full! ${plane.id} cannot land.`);
        return;
    }

    if (currentWeather === "Stormy" || visibility < 50 || windSpeed > 30) {
        log(`⚠️ ${plane.id} could not land at ${airport.name} due to dangerous conditions.`);
        return;
    }

    log(`✅ ${plane.id} landed at ${airport.name}.`);
    plane.status = "Landed";
    airport.planes.push(plane);
    successfulLandings++; // Track successful landings
    displayAirports();
}

function handleEmergency(plane) {
    const emergency = emergencies[Math.floor(Math.random() * emergencies.length)];
    log(`🚨 ${plane.id} is experiencing an emergency: ${emergency}!`);
    emergencyResolved++; // Track resolved emergencies
}

// Add a score display
function displayScore() {
    log(`🏆 Score: ${successfulLandings} successful landings, ${emergencyResolved} emergencies resolved.`);
}

setInterval(displayScore, 10000); // Update score every 10 seconds

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById("3dScene").appendChild(renderer.domElement);

// Add airports and planes
airports.forEach((airport, index) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077b6 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(index * 5, 0, 0); // Spread airports horizontally
    scene.add(cube);
});

planes.forEach((plane, index) => {
    const geometry = new THREE.SphereGeometry(0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(index, 2, 0); // Position planes above airports
    scene.add(sphere);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
camera.position.z = 10; // Set camera distance
animate();


