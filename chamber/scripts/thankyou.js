document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const summaryBox = document.getElementById("submission-summary");

  if (summaryBox) {
    summaryBox.innerHTML = `
      <ul>
        <li><strong>First Name:</strong> ${params.get("firstName") || ""}</li>
        <li><strong>Last Name:</strong> ${params.get("lastName") || ""}</li>
        <li><strong>Email:</strong> ${params.get("email") || ""}</li>
        <li><strong>Mobile Phone:</strong> ${params.get("phone") || ""}</li>
        <li><strong>Organization:</strong> ${params.get("organization") || ""}</li>
        <li><strong>Timestamp:</strong> ${params.get("timestamp") || ""}</li>
      </ul>
    `;
  }
});