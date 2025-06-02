document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("wh2aacVrjVdaDZYhM");

  const form = document.getElementById("contact-form");
  const notification = document.getElementById("notification");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
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
        showNotification("Message sent successfully! We'll contact you soon.", "success");
      }, function(error) {
        console.error('FAILED...', error);
        showNotification("Error sending message. Please try again later.", "error");
      });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function showNotification(message, type) {
    const notification = document.getElementById("notification");
    
    // Set message and type
    notification.textContent = message;
    notification.className = "notification"; // Reset classes
    notification.classList.add(type);
    
    // Show notification
    notification.classList.add("show");
    
    // Hide after 8 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      notification.classList.add("hide");
      
      // Remove hide class after animation completes
      setTimeout(() => {
        notification.classList.remove("hide");
      }, 300);
    }, 5000);
  }
});