document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("age-modal");
    var span = document.getElementsByClassName("close")[0];
    var yesButton = document.getElementById("yes-button");
    var noButton = document.getElementById("no-button");
    var adultLinks = document.querySelectorAll(".adult-link");
    var linkToFollow = "";
    var isAdultVerified = false; // Variable to track age verification

    adultLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            linkToFollow = this.getAttribute("data-link"); // Update linkToFollow every time an adult link is clicked
            if (!isAdultVerified) { // Only show modal if not verified
                modal.style.display = "flex";
            } else {
                window.open(linkToFollow, "_blank"); // Directly open link if verified
            }
        });
    });

    yesButton.onclick = function() {
        modal.style.display = "none";
        isAdultVerified = true; // Set verified to true
        window.open(linkToFollow, "_blank"); // Open the correct link after verification
    }

    noButton.onclick = function() {
        modal.style.display = "none";
        isAdultVerified = false; // Set verified to false
        adultLinks.forEach(function(link) { // Disable all adult links
            link.style.pointerEvents = "none";
            link.style.opacity = "0.5";
        });
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
