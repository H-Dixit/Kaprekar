// Declare steps as a global variable
let steps = 0;

// Function to update steps display
function updateStepsDisplay() {
    document.getElementById('steps-count').textContent = steps;
}

// Function to reset calculator
function resetCalculator() {
    steps = 0;
    updateStepsDisplay();
    document.getElementById('numberInput').value = '';
    document.getElementById('result').innerHTML = '';
}


function calculateKaprekar() {
    let num = document.getElementById('numberInput').value;
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Reset the steps at the start of new calculation
    steps = 0;
    updateStepsDisplay();

    if (num.length === 1 && num === '7') {
        // Redirect to YouTube video
        window.location.href = "https://www.youtube.com/watch?v=JAIVxKw36Rg&t=87s";
        return;
    } elif (num.length === 4 && num === '6174') {
        // Redirect to YouTube video
        window.location.href = "https://www.youtube.com/watch?v=d8TRcZklX_Q";
        return;
    }



    // Validate the input
    if (num.length !== 4 || isNaN(num)) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a valid 4-digit number!</p>'; 
        return;
    }

    let currentNum = num;
    let stepHtml = '';

    // Check if the number is already 6174
    if (num === '6174') {
        resultDiv.innerHTML = `
            <div class="step" style="background-color: #e6ffe6;">
                <strong>The number is already Kaprekar's Constant (6174)!</strong>
            </div>
        `;
        return;
    }


    while (currentNum !== '6174' && steps < 8) {
        // Pad the number with zeros if it's less than 4 digits
        while (currentNum.length < 4) {
            currentNum = '0' + currentNum;
        }
        
        let ascending = currentNum.split('').sort().join('');
        let descending = currentNum.split('').sort((a, b) => b - a).join('');
        let diff = parseInt(descending) - parseInt(ascending);
        
        // Format the number to 4 digits
        currentNum = diff.toString().padStart(4, '0');
        
        
        stepHtml += `
        <div class="step">
        <strong>Step ${steps + 1}</strong><br>
        Descending: ${descending}<br>
        Ascending: ${ascending}<br>
        Diff: ${descending} - ${ascending} = ${currentNum}
        </div>
        `;
        
        steps++;
        updateStepsDisplay();
        
        if (currentNum === 6174) {
            stepHtml += `
            <div class="step" style="background-color: #e6ffe6;">
            <strong>Kaprekar's Constant 6174 reached in ${steps} steps!</strong>
            </div>
            `;
            break;
        }
        
        
            if (currentNum === '0000') {
                stepHtml += `
                <div class="step" style="background-color: #ffe6e6;">
                <strong>Process leads to 0000. Invalid input!</strong>
                </div>
                `;
                break;
            }
        }
        
        resultDiv.innerHTML = stepHtml;
    }

// Add event listener for Enter key
document.getElementById('numberInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateKaprekar();
    }
});