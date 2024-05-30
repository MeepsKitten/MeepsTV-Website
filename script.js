document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("age-modal");
    var notesModal = document.getElementById("notes-modal");
    var noteTitle = document.getElementById("note-title");
    var noteText = document.getElementById("note-text");
    var noteOkButton = document.getElementById("note-ok-button");
    var yesButton = document.getElementById("yes-button");
    var noButton = document.getElementById("no-button");
    var allLinks = document.querySelectorAll("a[data-note], a.adult-link");
    var linkToFollow = "";
    var isAdultVerified = false;
    var isAdultLink = false; // Define isAdultLink at a higher scope

    allLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var potentialLink = this.getAttribute("data-link");
            linkToFollow = potentialLink ? potentialLink : ""; // Only use data-link, ignore href if data-link is not present
            var note = this.getAttribute("data-note");
            isAdultLink = link.classList.contains("adult-link"); // Update isAdultLink based on the clicked link

            if (note) {
                noteText.innerHTML = note;
                noteTitle.textContent = link.getAttribute("data-title") || "Important Note";
                notesModal.style.display = "flex";
            } else if (isAdultLink && !isAdultVerified) {
                modal.style.display = "flex";
            } else if (linkToFollow) { // Check if there is a link to follow
                window.open(linkToFollow, "_blank");
            } else {
                // If no link to follow, just close the modal if it's open
                notesModal.style.display = "none";
                modal.style.display = "none";
            }
        });
    });

    noteOkButton.onclick = function() {
        notesModal.style.display = "none";
        if (isAdultLink && !isAdultVerified) {
            modal.style.display = "flex";
        } else if (linkToFollow) { // Check if there is a link to follow
            window.open(linkToFollow, "_blank");
        }
        // Do not reset linkToFollow here
    };

    yesButton.onclick = function() {
        modal.style.display = "none";
        isAdultVerified = true;
        if (linkToFollow) {
            window.open(linkToFollow, "_blank");
        }
        linkToFollow = ""; // Reset link to follow after handling
    };

    noButton.onclick = function() {
        modal.style.display = "none";
        isAdultVerified = false;
        allLinks.forEach(function(link) {
            if (link.classList.contains("adult-link")) {
                link.style.pointerEvents = "none";
                link.style.opacity = "0.5";
            }
        });
        linkToFollow = ""; // Reset link to follow after handling
    };
});

