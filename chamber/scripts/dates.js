// select DOM element for output
const copyYear = document.querySelector("#copyYear");
const modYear = document.querySelector("#lastModified");

// instance year
const today = new Date();

// format string output and insert into HTML
copyYear.innerHTML = `&copy${today.getFullYear()}      `;
modYear.innerHTML = `Last Modified: ${document.lastModified}`;


// store last visit in localstorage
const thisVisit = new Date();

// retrieve last date object, then store new date object

if (!localStorage.getItem("lastVisit")) {
    // no stored date — save current visit
    localStorage.setItem("lastVisit", thisVisit.toISOString());
    var lastVisitMsg = "Thank you for visiting! We're glad to have you.";
} else {
    // get last date object stored from last visit
    const lastVisit = new Date(localStorage.getItem("lastVisit"));
    const msBetween = thisVisit - lastVisit;
    if (msBetween <= 86400000) {
        var lastVisitMsg = `Welcome back! Miss us so soon?`;
    }
    else {
        const daysBetween = msBetween / 86400000;
        if (daysBetween < 1) {
            var lastVisitMsg = `You last visited 1 day ago`;
        } else {
            var lastVisitMsg = `You last visited ${daysBetween} days ago`;
        };
        
    }
    // update stored date to now
    localStorage.setItem("lastVisit", thisVisit.toISOString());
}

// you can now use lastVisitMsg to display the message in the UI or console
console.log(lastVisitMsg);
const visitMsg = document.querySelector('.lastVisit');
visitMsg.innerText = lastVisitMsg;
