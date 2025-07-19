// Cat Contacts Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Handle contact form submission
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }
});

function handleFormSubmission(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showMessage(
    "Thank you for your message! We will get back to you soon.",
    "success"
  );

  // Reset form
  event.target.reset();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Style the message
  messageDiv.style.padding = "var(--spacing-sm)";
  messageDiv.style.marginTop = "var(--spacing-sm)";
  messageDiv.style.borderRadius = "var(--border-radius)";
  messageDiv.style.fontWeight = "bold";

  if (type === "success") {
    messageDiv.style.backgroundColor = "#d4edda";
    messageDiv.style.color = "#155724";
    messageDiv.style.border = "1px solid #c3e6cb";
  } else {
    messageDiv.style.backgroundColor = "#f8d7da";
    messageDiv.style.color = "#721c24";
    messageDiv.style.border = "1px solid #f5c6cb";
  }

  // Add message to form
  const form = document.querySelector(".contact-form form");
  form.appendChild(messageDiv);

  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}
