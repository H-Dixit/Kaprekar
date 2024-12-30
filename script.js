let steps = 0;

function calculateKaprekar() {
    let num = document.getElementById('numberInput').value;
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Reset the steps
    steps = 0;

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
        
        
        if (currentNum === 6174) {
            stepHtml += `
                <div class="step" style="background-color: #e6ffe6;">
                    <strong>Kaprekar's Constant 6174 reached in ${steps} steps!</strong>
                </div>
                `;
                return;
            }
            
        steps++;
        
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