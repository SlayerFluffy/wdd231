// fetch memebers.json. store as a variable. 
async function getjson(path) {
    const file = await fetch(path);
    const data = await file.json();
    return data;
}

const display = document.querySelector(".displayMembers");

// set attributes for member info
const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('address');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let level = document.createElement('p');
        
        
        logo.setAttribute('src', member.photo);
        logo.setAttribute('alt', `Image of ${member.name}'s logo`);
        logo.setAttribute('loading', 'lazy');
        
        name.textContent = member.name;

        address.innerHTML = member.address.join(',<br>');

        phone.textContent = member.phone;

        website.textContent = "Visit Us"
        website.setAttribute('href', member.website);

        if (member.membershipLevel === 1) {
            level.textContent = "Member";
        } else if (member.membershipLevel === 2) {
            level.textContent = "Silver Member";
        } else {
            level.textContent = "Gold member";
        }

        // populate card with attributes.
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        // add card to display members div
        display.appendChild(card);
    });
}

// set display to list

const displayList = (members) => {
    const memberTable = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Address', 'Phone', 'Website Link', 'Membership Level'];

    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    memberTable.appendChild(thead);
    
    members.forEach((member) => {
        let line = document.createElement('tr');
        let name = document.createElement('td');
        let address = document.createElement('td');
        let phone = document.createElement('td');
        let website = document.createElement('td');
        let level = document.createElement('td');

        name.textContent = member.name;

        address.innerHTML = member.address.join(', ');

        phone.textContent = member.phone;

        website.textContent = "Visit Us"
        website.setAttribute('href', member.website);

        if (member.membershiplevel === 1) {
            level.textContent = "Member";
        } else if (member.membershiplevel === 2) {
            level.textContent = "Silver Member";
        } else {
            level.textContent = "Gold member";
        }

        line.appendChild(name);
        line.appendChild(address);
        line.appendChild(phone);
        line.appendChild(website);
        line.appendChild(level);

        memberTable.appendChild(line);
    })
    display.appendChild(memberTable);
}


// add event listener for buttons to set display.
getjson("data/members.json").then(displayMembers);

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", function (event) {
    display.innerHTML = "";
    getjson("data/members.json").then(displayMembers);
})

listButton.addEventListener("click", function (event) {
    display.innerHTML = "";
    getjson("data/members.json").then(displayList);
})