// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const buildingsView = document.getElementById('buildings-view');
const floorPlanView = document.getElementById('floor-plan-view');
const buildingTitle = document.getElementById('building-title');
const floorGrid = document.getElementById('floor-grid');

// Simulated data
const buildings = {
    main: {
        name: 'Main Building',
        floors: 3,
        gridSize: 6
    },
    science: {
        name: 'Science Block',
        floors: 3,
        gridSize: 6
    }
};

// Current state
let currentBuilding = null;
let currentFloor = 1;
let gridCells = [];

// Login handler
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // TODO: Add actual authentication
    if (username && password) {
        loginSection.classList.remove('active');
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        dashboardSection.classList.add('active');
    }

    return false;
}

// Logout handler
function handleLogout() {
    loginSection.classList.remove('hidden');
    loginSection.classList.add('active');
    dashboardSection.classList.remove('active');
    dashboardSection.classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Show buildings view
function showBuildings() {
    buildingsView.classList.remove('hidden');
    buildingsView.classList.add('active');
    floorPlanView.classList.remove('active');
    floorPlanView.classList.add('hidden');
}

// Show floor plan for a building
function showFloorPlan(buildingId) {
    currentBuilding = buildingId;
    currentFloor = 1;
    buildingTitle.textContent = `${buildings[buildingId].name} - Floor ${currentFloor}`;
    
    buildingsView.classList.remove('active');
    buildingsView.classList.add('hidden');
    floorPlanView.classList.remove('hidden');
    floorPlanView.classList.add('active');

    // Reset floor tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector('.tab').classList.add('active');

    generateGrid();
}

// Select floor
function selectFloor(floorNumber) {
    currentFloor = floorNumber;
    buildingTitle.textContent = `${buildings[currentBuilding].name} - Floor ${currentFloor}`;
    
    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab:nth-child(${floorNumber})`).classList.add('active');

    generateGrid();
}

// Generate grid cells
function generateGrid() {
    floorGrid.innerHTML = '';
    gridCells = [];
    
    const size = buildings[currentBuilding].gridSize;
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.innerHTML = `
            <div>Room ${i + 1}</div>
            <small>${Math.floor(Math.random() * 20)} people</small>
        `;
        
        // Randomly assign initial states
        const random = Math.random();
        if (random > 0.8) {
            cell.classList.add('hazard');
        } else if (random > 0.6) {
            cell.classList.add('congested');
        } else {
            cell.classList.add('safe');
        }
        
        gridCells.push(cell);
        floorGrid.appendChild(cell);
    }
}

// Simulate evacuation
function simulateEvacuation() {
    // TODO: Implement D* Lite pathfinding
    alert('Simulating evacuation...');
    
    // For now, just randomly update cell states
    gridCells.forEach(cell => {
        cell.classList.remove('safe', 'congested', 'hazard');
        const random = Math.random();
        if (random > 0.9) {
            cell.classList.add('hazard');
        } else if (random > 0.7) {
            cell.classList.add('congested');
        } else {
            cell.classList.add('safe');
        }
    });
}

// Simulate blocking a path
function simulateBlockPath() {
    const randomIndex = Math.floor(Math.random() * gridCells.length);
    const cell = gridCells[randomIndex];
    
    cell.classList.remove('safe', 'congested');
    cell.classList.add('hazard');
}

// Initialize tooltips or other UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Add any initialization code here
    console.log('Smart Evac Dashboard initialized');
}); 