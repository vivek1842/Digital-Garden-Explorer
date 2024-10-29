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

async function updateGrowth(type) {
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
    new Chart(ctx, {
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
