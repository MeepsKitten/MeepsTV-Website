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
            linkToFollow = this.getAttribute("data-link") || this.href;
            var note = this.getAttribute("data-note");
            isAdultLink = link.classList.contains("adult-link"); // Update isAdultLink based on the clicked link

            if (note) {
                noteText.innerHTML = note;
                noteTitle.textContent = link.getAttribute("data-title") || "Important Note";
                notesModal.style.display = "flex";
            } else if (isAdultLink && !isAdultVerified) {
                modal.style.display = "flex";
            } else {
                window.open(linkToFollow, "_blank");
            }
        });
    });

    noteOkButton.onclick = function() {
        notesModal.style.display = "none";
        if (isAdultLink && !isAdultVerified) {
            modal.style.display = "flex";
        } else {
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

