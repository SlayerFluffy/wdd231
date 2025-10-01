document.addEventListener("DOMContentLoaded", () => {
  // Grab all the "learn more" buttons
  const modalButtons = document.querySelectorAll(".card-link");
  // Grab all modal close buttons
  const closeButtons = document.querySelectorAll(".modal-close");

  // Open modal when "Learn more" is clicked
  modalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal(); // semantic HTML method
      }
    });
  });

  // Close modal when close buttons are clicked
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });

  // Optional: close modal if user clicks outside modal content
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", e => {
      const rect = dialog.querySelector(".modal-content").getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
});
