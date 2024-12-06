// Optional smooth scroll behavior using JavaScript (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
///------------------
// Global variable to store formulas from the Excel file
let formulas = [];

// Function to read the static Excel file and parse it
function readExcelFile() {
    // Use jsDelivr CDN for the file hosted on GitHub
    fetch('https://raw.githubusercontent.com/HiteshBhanushali/mlproject/refs/heads/main/formulas.csv') // Replace with your GitHub raw URL via jsDelivr
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
            const json = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
            formulas = json; // Store the formulas in the global variable

            // Call function to display all formulas in the formula section
            displayFormulas(formulas);
        })
        .catch(error => console.error('Error loading Excel file:', error));
}

// Function to display formulas in the Formula Section
function displayFormulas(formulasList) {
    const formulasListElement = document.getElementById('formulas-list');
    formulasListElement.innerHTML = ''; // Clear existing content

    formulasList.forEach(formula => {
        // Create the list item for the formula
        const formulaItem = document.createElement('li');
        
        // Create the tooltip with the formula description and example
        const tooltip = `
            <div class="tooltip">
                <p><strong>Description:</strong> ${formula['Description']}</p>
                <p><strong>Example:</strong> ${formula['Use Case Example']}</p>
            </div>
        `;
        
        // Add the formula name and the tooltip inside the list item
        formulaItem.innerHTML = `
            <strong>${formula['Formula Name']}</strong>
            ${tooltip}
        `;

        // Add a click event to show the popup with full details
        formulaItem.addEventListener('click', (e) => {
            showPopup(formula); // Pass the formula data to the showPopup function
        });

        // Add hover effect for displaying the tooltip
        formulaItem.addEventListener('mouseover', () => {
            const tooltipElement = formulaItem.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.style.visibility = 'visible';  // Show tooltip on hover
                tooltipElement.style.opacity = 1; // Make the tooltip visible smoothly
            }
        });

        formulaItem.addEventListener('mouseout', () => {
            const tooltipElement = formulaItem.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.style.visibility = 'hidden';  // Hide tooltip on mouseout
                tooltipElement.style.opacity = 0; // Make the tooltip disappear smoothly
            }
        });

        // Append the formula item to the list
        formulasListElement.appendChild(formulaItem);
    });
}

// Function to show the popup with formula details
function showPopup(formula) {
    // Check if a popup already exists, and if it does, remove it before showing a new one
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create a popup modal
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'flex'; // Make the popup visible

    // Set the inner content of the popup with formula details
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h3>${formula['Formula Name']}</h3>
            <p><strong>Description:</strong> ${formula['Description']}</p>
            <p><strong>Example:</strong> ${formula['Use Case Example']}</p>
        </div>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Close the popup when clicking the close button
    const closeButton = popup.querySelector('.popup-close');
    closeButton.addEventListener('click', () => {
        popup.remove(); // Remove the popup from the DOM
    });

    // Optionally, you can close the popup by clicking outside the modal
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.remove();
        }
    });
}


// Function to filter formulas based on search query
function filterFormulas() {
    const query = document.getElementById('search').value.toLowerCase();

    // Filter formulas based on matching the formula name
    const filteredFormulas = formulas.filter(formula => 
        formula['Formula Name'].toLowerCase().includes(query)
    );

    // Limit to top 10 results
    const topFormulas = filteredFormulas.slice(0, 10);

    // Display the filtered (top 10) formulas
    displayFormulas(topFormulas);

    // Display the details of the first formula in the top 10 (optional)
    if (topFormulas.length > 0) {
        const formula = topFormulas[0]; // Get first match in the top 10
        document.getElementById('formula-name').textContent = formula['Formula Name'];
        document.getElementById('formula-description').textContent = formula['Description'];
        document.getElementById('formula-example').textContent = formula['Use Case Example'];
        // document.getElementById('formula-details').style.display = 'block'; // Show formula details
    } else {
        document.getElementById('formula-details').style.display = 'none'; // Hide formula details if no match
    }
}

// Load the Excel file when the page loads
window.onload = function() {
    readExcelFile(); // Load the formulas from the static Excel file
};

// Listen for search input
document.getElementById('search').addEventListener('input', filterFormulas);








// Function to display formulas in the Formula Section
// function displayFormulas(formulasList) {
//     const formulasListElement = document.getElementById('formulas-list');
//     // formulasListElement.innerHTML = ''; // Clear existing content

//     formulasList.forEach(formula => {
//         const formulaItem = document.createElement('li');
//         formulaItem.innerHTML = `
//             <strong>${formula['Formula Name']}</strong>
//             <p>${formula['Description']}</p>
//             <p><strong>Example:</strong> ${formula['Use Case Example']}</p>
//         `;
//         formulasListElement.appendChild(formulaItem);
//     });
//     formulasList.forEach(formula => {
//         // Create the list item for the formula
//         const formulaItem = document.createElement('li');
        
//         // Create the tooltip with the formula description and example
//         const tooltip = `
//             <div class="tooltip">
//                 <p><strong>Description:</strong> ${formula['Description']}</p>
//                 <p><strong>Example:</strong> ${formula['Use Case Example']}</p>
//             </div>
//         `;
        
//         // Add the formula name and the tooltip inside the list item
//         formulaItem.innerHTML = `
//             <strong>${formula['Formula Name']}</strong>
//             ${tooltip}
//         `;

//         // Add click event to show the popup with full details
//         formulaItem.addEventListener('click', () => {
//             showPopup(formula); // Show the formula details in the popup
//         });

//         // Add hover effect for displaying the tooltip
//         formulaItem.addEventListener('mouseover', () => {
//             formulaItem.querySelector('.tooltip').style.visibility = 'visible';
//         });

//         formulaItem.addEventListener('mouseout', () => {
//             formulaItem.querySelector('.tooltip').style.visibility = 'hidden';
//         });

//         formulasListElement.appendChild(formulaItem);
//     });
// }