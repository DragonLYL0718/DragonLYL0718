
document.addEventListener('DOMContentLoaded', function() {
    console.log("gallery.js is loaded");
    document.querySelectorAll('.gallery-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
        setTimeout(() => window.location.reload(), 200)
        });
    });
});