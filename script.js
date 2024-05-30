document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("age-modal");
    var notesModal = document.getElementById("notes-modal");
    var noteTitle = document.getElementById("note-title");
    var noteText = document.getElementById("note-text");
    var noteOkButton = document.getElementById("note-ok-button");
    var yesButton = document.getElementById("yes-button");
    var noButton = document.getElementById("no-button");
    var allLinks = document.querySelectorAll("a[data-note]"); // Select all links that have a data-note attribute
    var linkToFollow = "";
    var isAdultVerified = false;

    allLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            linkToFollow = this.getAttribute("data-link") || this.href; // Use data-link or default href
            var note = this.getAttribute("data-note");
            var isAdultLink = link.classList.contains("adult-link"); // Check if it's an adult link

            if (note) {
                noteText.innerHTML = note; // Use innerHTML to render HTML content
                noteTitle.textContent = link.getAttribute("data-title") || "Important Note"; // Set custom title or default
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
        if (!isAdultVerified && allLinks[0].classList.contains("adult-link")) { // Check if the first link is an adult link
            modal.style.display = "flex";
        } else {
            window.open(linkToFollow, "_blank");
        }
    };

    if (yesButton) {
        yesButton.onclick = function() {
            modal.style.display = "none";
            isAdultVerified = true;
            window.open(linkToFollow, "_blank");
        };
    } else {
        console.error("yesButton not found");
    }

    if (noButton) {
        noButton.onclick = function() {
            modal.style.display = "none";
            isAdultVerified = false;
            allLinks.forEach(function(link) {
                if (link.classList.contains("adult-link")) {
                    link.style.pointerEvents = "none";
                    link.style.opacity = "0.5";
                }
            });
        };
    } else {
        console.error("noButton not found");
    }
});

