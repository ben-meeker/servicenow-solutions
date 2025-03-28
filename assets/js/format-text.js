function formatSolutionText(text) {
    // Remove dashes and underscores
    text = text.replace(/[-_]/g, ' ');
    
    // Capitalize first letter of each word
    return text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Function to format all solution links
function formatSolutionLinks() {
    const solutionTitles = document.querySelectorAll('.solution-title');
    solutionTitles.forEach(title => {
        if (!title.dataset.formatted) {
            title.textContent = formatSolutionText(title.textContent);
            title.dataset.formatted = 'true';
        }
    });
}

// Call this when the dropdown is populated
document.addEventListener('DOMContentLoaded', () => {
    // Initial format
    formatSolutionLinks();
    
    // Create a MutationObserver to watch for changes in the solutions list
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                formatSolutionLinks();
            }
        });
    });
    
    // Start observing the solutions list for changes
    const solutionsList = document.getElementById('solutions-ul');
    if (solutionsList) {
        observer.observe(solutionsList, { 
            childList: true, 
            subtree: true 
        });
    }
}); 