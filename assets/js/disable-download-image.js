document.addEventListener('contextmenu', function(event) {
    var targetElement = event.target;
    
    // Check if the clicked element is an image or inside an element with class "hero-section"
    if (targetElement.tagName === 'IMG' || targetElement.closest('.hero-section')) {
        event.preventDefault();
    }
});
