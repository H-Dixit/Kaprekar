let currentNumber = 1000;
let isProcessing = false;
let processInterval;
const numbersPerBatch = 100;


function processOneNumber(num) {
    let steps = 0;
    let currentNum = num.toString().padStart(4, '0');

    // If all digits are same, return -1
    if (new Set(currentNum.split('')).size === 1) return -1;

    while (true) {
        // Sort digits in ascending and descending order
        let ascending = currentNum.split('').sort().join('');
        let descending = currentNum.split('').sort((a, b) => b - a).join('');
        
        // Calculate difference
        let difference = parseInt(descending) - parseInt(ascending);
        currentNum = difference.toString().padStart(4, '0');

        steps++;

        if (currentNum === '6174') return steps;
        if (currentNum === '0000' || steps > 7) return -1;
    }
}


function addResultRow(number, steps) {
    const tbody = document.getElementById('results-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${number}</td>
        <td>${steps === -1 ? 'Invalid' : steps}</td>
    `;
    tbody.appendChild(row);
}

function processBatch() {
    if (currentNumber > 9999) {
        stopProcess();
        return;
    }

    const batchEnd = Math.min(currentNumber + numbersPerBatch, 9999);
    const fragment = document.createDocumentFragment();

    for (let num = currentNumber; num <= batchEnd; num++) {
        document.getElementById('current-number').textContent = num;

        const steps = processOneNumber(num);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${num}</td>
            <td>${steps === -1 ? 'Invalid' : steps}</td>
        `;
        fragment.appendChild(row);
    }

    document.getElementById('results-body').appendChild(fragment);

    // Scroll to bottom
    const container = document.getElementById('results-container');
    container.scrollTop = container.scrollHeight;
    
    currentNumber = batchEnd + 1;
}

function startProcess() {
    if (!isProcessing) {
        isProcessing = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('resetBtn').disabled = true;
        document.getElementById('loading-indicator').style.display = 'block';
        
        processInterval = setInterval(() => {
            processBatch();
        }, 1); // Process a number every 1ms
    }
}

function stopProcess() {
    if (isProcessing) {
        isProcessing = false;
        clearInterval(processInterval);
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('loading-indicator').style.display = 'none';

        if (currentNumber >= 9999) {
            document.getElementById('current-number').textContent = 'Complete!';
        }
    }
}

function resetProcess() {
    stopProcess();
    currentNumber = 1000;
    document.getElementById('current-number').textContent = '-';
    document.getElementById('results-body').innerHTML = '';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
}

// Initialize
resetProcess();