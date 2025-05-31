document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const popup = document.getElementById("popup");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Simulate successful submission
        form.reset();
        showPopup("Message sent successfully!");
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function showPopup(message) {
        popup.textContent = message;
        popup.classList.remove("hidden");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => {
                popup.classList.add("hidden");
            }, 400);
        }, 3000); // Hide after 3 seconds
    }
});
