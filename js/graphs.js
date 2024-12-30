let stepsDistributionChart;
let stepsFrequencyChart;

function processAllNumbers() {
    const results = [];
    
    for (let num = 1000; num <= 9999; num++) {
        const steps = calculateSteps(num);
        if (steps !== -1) {  // Only include valid results
            results.push(steps);
        }
    }
    
    return results;
}

function calculateSteps(num) {
    let steps = 0;
    let currentNum = num.toString().padStart(4, '0');

    if (new Set(currentNum.split('')).size === 1) return -1;

    while (true) {
        let ascending = currentNum.split('').sort().join('');
        let descending = currentNum.split('').sort((a, b) => b - a).join('');
        let difference = parseInt(descending) - parseInt(ascending);
        currentNum = difference.toString().padStart(4, '0');
        
        steps++;

        if (currentNum === '6174') return steps;
        if (currentNum === '0000' || steps > 7) return -1;
    }
}

function generateGraphs() {
    const results = processAllNumbers();
    
    // Calculate frequency of each step count
    const frequency = results.reduce((acc, steps) => {
        acc[steps] = (acc[steps] || 0) + 1;
        return acc;
    }, {});

    // Prepare data for charts
    const labels = Object.keys(frequency).sort((a, b) => parseInt(a) - parseInt(b));
    const data = labels.map(label => frequency[label]);

    // Destroy existing charts if they exist
    if (stepsDistributionChart) stepsDistributionChart.destroy();
    if (stepsFrequencyChart) stepsFrequencyChart.destroy();

    // Create Distribution Chart
    stepsDistributionChart = new Chart(
        document.getElementById('stepsDistribution'),
        {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Occurrences',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Numbers'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Steps to Reach 6174'
                        }
                    }
                }
            }
        }
    );

    // Create Frequency Chart (Pie Chart)
    stepsFrequencyChart = new Chart(
        document.getElementById('stepsFrequency'),
        {
            type: 'pie',
            data: {
                labels: labels.map(l => `${l} steps`),
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        }
    );
}

// Generate graphs when page loads
document.addEventListener('DOMContentLoaded', generateGraphs);