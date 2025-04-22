function initModalFunctionality() {

    var modal = document.querySelector('.modal');
    if (!modal) {
        
        var modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = '<span class="close">&times;</span><img class="modal-content" id="modal-image">';
        document.body.appendChild(modal);
        modal.style.display = "none";
    }
    
    var modalImg = document.getElementById("modal-image");
    var closeBtn = document.querySelector('.modal .close');

    function openModal(imageSrc) {
        modal.style.display = "block";
        modalImg.src = imageSrc;
    }

    document.querySelectorAll('.image-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(this.href);
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
}

// Ensure that the initModalFunctionality function is called after the DOM is fully loaded.
if (document.readyState === 'complete') {
    initModalFunctionality();
  } else {
    document.addEventListener('DOMContentLoaded', initModalFunctionality);
}