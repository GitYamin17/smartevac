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

    const roomLayout = [
  // LEFT CLUSTER
  { id: 101, x: 100, y: 100, w: 90, h: 60 },
  { id: 102, x: 100, y: 180, w: 90, h: 60 },
  { id: 103, x: 100, y: 260, w: 90, h: 60 },

  // RIGHT CLUSTER
  { id: 104, x: 700, y: 100, w: 90, h: 60 },
  { id: 105, x: 700, y: 180, w: 90, h: 60 },
  { id: 106, x: 700, y: 260, w: 90, h: 60 },

  // TOP CENTRAL ROOMS
  { id: 107, x: 300, y: 100, w: 100, h: 60 },
  { id: 108, x: 420, y: 100, w: 100, h: 60 },

  // CENTER HALLWAY (like a corridor down middle)
  { id: 109, x: 300, y: 180, w: 100, h: 60 },
  { id: 110, x: 420, y: 180, w: 100, h: 60 },

  // BOTTOM CENTRAL ROOMS
  { id: 111, x: 300, y: 260, w: 100, h: 60 },
  { id: 112, x: 420, y: 260, w: 100, h: 60 },
   
  // LOWER WING LEFT
  { id: 113, x: 100, y: 380, w: 90, h: 60 },
  { id: 114, x: 100, y: 460, w: 90, h: 60 },

  // LOWER WING RIGHT
  { id: 115, x: 700, y: 380, w: 90, h: 60 },
  { id: 116, x: 700, y: 460, w: 90, h: 60 },

  // LARGE BACK ROOMS
  { id: 117, x: 300, y: 400, w: 140, h: 100 },
  { id: 118, x: 500, y: 400, w: 140, h: 100 }
];

    roomLayout.forEach(room => {
        const count = Math.floor(Math.random() * 20);
        const cell = document.createElement('div');
        cell.className = `grid-cell ${getStatusClass(count)}`;
        cell.style.left = `${room.x}px`;
        cell.style.top = `${room.y}px`;
        cell.style.width = `${room.w}px`;
        cell.style.height = `${room.h}px`;
        cell.innerHTML = `<strong>Room ${room.id}</strong>${count} people`;

        floorGrid.appendChild(cell);
        gridCells.push(cell);
    });
}

function getStatusClass(count) {
    if (count === 0) return 'safe';
    if (count <= 4) return 'congested';
    return 'hazard';
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
