const gardenData = {
    Mindfulness: { growth: [], lastUpdated: null },
    Knowledge: { growth: [], lastUpdated: null },
    Creativity: { growth: [], lastUpdated: null }
};

function addPlant(type) {
    const plantList = document.getElementById('gardenList');
    const plantItem = document.createElement('li');
    plantItem.className = 'list-group-item';
    plantItem.textContent = `${type} Plant`;
    plantList.appendChild(plantItem);

    updateGrowth(type);
}
let growthChart;  // Global variable to store the chart instance

function updateGrowth(type) {
    const growthFactor = Math.random() * 10;  // Replace with API data if available
    const currentDate = new Date().toLocaleDateString();
    
    if (!gardenData[type].lastUpdated || gardenData[type].lastUpdated !== currentDate) {
        gardenData[type].growth.push(growthFactor);
        gardenData[type].lastUpdated = currentDate;
    }

    renderChart(type);
}

function renderChart(type) {
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    // Check if the chart instance already exists and destroy it
    if (growthChart) {
        growthChart.destroy();
    }

    // Create a new chart instance
    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: gardenData[type].growth.map((_, i) => `Day ${i + 1}`),
            datasets: [{
                label: `${type} Growth`,
                data: gardenData[type].growth,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: { responsive: true }
    });
}

// Adding Journal Entry
function addJournalEntry() {
    const journalInput = document.getElementById('journalInput').value;
    const journalEntries = document.getElementById('journalEntries');
    
    if (journalInput) {
        const entry = document.createElement('p');
        entry.textContent = `• ${journalInput}`;
        journalEntries.appendChild(entry);
        document.getElementById('journalInput').value = ''; // Clear input
    }
}

// Drag-and-Drop Functionality
const tiles = document.querySelectorAll('.draggable');
const gardenLayout = document.getElementById('gardenLayout');

tiles.forEach(tile => {
    tile.addEventListener('dragstart', dragStart);
});

gardenLayout.addEventListener('dragover', dragOver);
gardenLayout.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    gardenLayout.appendChild(draggableElement);
    e.dataTransfer.clearData();
}
