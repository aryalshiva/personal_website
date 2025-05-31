document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  emailjs.init("wh2aacVrjVdaDZYhM"); // Your public key from EmailJS

  const form = document.getElementById("contact-form");
  const popup = document.getElementById("popup");
  const errorPopup = document.getElementById("error-popup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      showErrorPopup("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      showErrorPopup("Please enter a valid email address.");
      return;
    }

    // Prepare the template parameters
    const templateParams = {
      name: name,
      email: email,
      message: message,
      date_time: new Date().toLocaleTimeString(),
    };

    // Send email using EmailJS
    emailjs.send('service_maldf5c', 'template_928zquk', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        form.reset();
        showPopup(popup, "Message sent successfully!");
      }, function(error) {
        console.error('FAILED...', error);
        showPopup(errorPopup, "Error sending message. Please try again.");
      });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function showPopup(popupElement, message) {
    popupElement.textContent = message;
    popupElement.classList.remove("hidden");
    
    // Hide after 3 seconds
    setTimeout(() => {
      popupElement.classList.add("hidden");
    }, 3000);
  }

  function showErrorPopup(message) {
    errorPopup.textContent = message;
    errorPopup.classList.remove("hidden");
    
    // Hide after 3 seconds
    setTimeout(() => {
      errorPopup.classList.add("hidden");
    }, 3000);
  }
});