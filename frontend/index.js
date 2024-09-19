import { backend } from 'declarations/backend';

// Function to add a new part
async function addPart() {
    const pid = document.getElementById('pid').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const stock = parseInt(document.getElementById('stock').value);
    const units = document.getElementById('units').value;
    const avgCost = parseFloat(document.getElementById('avgCost').value);

    const part = { pid, title, description, stock, units, avgCost };

    try {
        await backend.addCarPart(part);
        alert('Part added successfully!');
        loadAllParts();
    } catch (error) {
        console.error('Error adding part:', error);
        alert('Failed to add part. Please try again.');
    }
}

// Function to load and display all parts
async function loadAllParts() {
    try {
        const parts = await backend.getAllCarParts();
        displayParts(parts);
    } catch (error) {
        console.error('Error loading parts:', error);
    }
}

// Function to search parts
async function searchParts() {
    const query = document.getElementById('searchQuery').value;
    try {
        const parts = await backend.searchCarParts(query);
        displayParts(parts);
    } catch (error) {
        console.error('Error searching parts:', error);
    }
}

// Function to display parts
function displayParts(parts) {
    const partsList = document.getElementById('partsList');
    partsList.innerHTML = '';

    parts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.className = 'part-item';
        partElement.innerHTML = `
            <h3>${part.title}</h3>
            <p>PID: ${part.pid}</p>
            <p>Description: ${part.description}</p>
            <p>Stock: ${part.stock} ${part.units}</p>
            <p>Average Cost: $${part.avgCost.toFixed(2)}</p>
            <button onclick="updatePart('${part.pid}')">Update</button>
            <button onclick="deletePart('${part.pid}')">Delete</button>
        `;
        partsList.appendChild(partElement);
    });
}

// Function to update a part
async function updatePart(pid) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newStock = parseInt(prompt('Enter new stock:'));
    const newUnits = prompt('Enter new units:');
    const newAvgCost = parseFloat(prompt('Enter new average cost:'));

    const updatedPart = {
        pid,
        title: newTitle,
        description: newDescription,
        stock: newStock,
        units: newUnits,
        avgCost: newAvgCost
    };

    try {
        const success = await backend.updateCarPart(updatedPart);
        if (success) {
            alert('Part updated successfully!');
            loadAllParts();
        } else {
            alert('Failed to update part. Part not found.');
        }
    } catch (error) {
        console.error('Error updating part:', error);
        alert('Failed to update part. Please try again.');
    }
}

// Function to delete a part
async function deletePart(pid) {
    if (confirm('Are you sure you want to delete this part?')) {
        try {
            const success = await backend.deleteCarPart(pid);
            if (success) {
                alert('Part deleted successfully!');
                loadAllParts();
            } else {
                alert('Failed to delete part. Part not found.');
            }
        } catch (error) {
            console.error('Error deleting part:', error);
            alert('Failed to delete part. Please try again.');
        }
    }
}

// Load all parts when the page loads
window.onload = loadAllParts;

// Make functions available globally
window.addPart = addPart;
window.searchParts = searchParts;
window.updatePart = updatePart;
window.deletePart = deletePart;
