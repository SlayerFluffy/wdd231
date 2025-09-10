// select DOM element for output
const copyYear = document.querySelector("#copyYear");
const modYear = document.querySelector("#lastModified");

// instance year
const today = new Date();

// format string output and insert into HTML
copyYear.innerHTML = `${today.getFullYear()}`;
modYear.innerHTML = `Last Modified: ${document.lastModified}`;