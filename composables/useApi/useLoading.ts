
export default function() {

    // Create the container for the spinner
    function createSpinnerContainer() {
        const container = document.createElement('div');
        container.id = 'loading-spinner';
        return container;
    }

    // Create the SVG element for the spinner
    function createSpinnerSvg() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'spinner-svg'); // Use setAttribute to add class
        svg.setAttribute('viewBox', '0 0 50 50');
        return svg;
    }

    // Create the circle element for the spinner
    function createSpinnerCircle() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'spinner-circle'); // Use setAttribute to add class
        return circle;
    }

    // Add the spinner to the DOM
    function showLoadingSpinner() {
        const container = createSpinnerContainer();
        const svg = createSpinnerSvg();
        const circle = createSpinnerCircle();

        svg.appendChild(circle);
        container.appendChild(svg);
        document.body.appendChild(container);
    }

    // Hide the spinner from the DOM
    function hideLoadingSpinner() {
        const container = document.getElementById('loading-spinner');
        if (container) {
            container.remove();
        }
    }

    return {
        showLoadingSpinner,
        hideLoadingSpinner
    };
};
