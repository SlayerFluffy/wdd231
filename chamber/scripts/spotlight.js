// fetch memebers.json. store as a variable. 
async function getjson(path) {
    const file = await fetch(path);
    const data = await file.json();
    return data;
}

const spotlight = document.querySelector(".spotlights");

// create cards for spotlight on index page

const spotlightMembers = (members) => {
    let selectedMembers = [];
    members.forEach((member) => {
        if (member.membershipLevel != 1) {
            let card = document.createElement('section');
            card.setAttribute('class', 'card');
            let logo = document.createElement('img');
            let name = document.createElement('h2');
            let tagLine = document.createElement('p');
            let email = document.createElement('a');
            let phone = document.createElement('p');
            let website = document.createElement('a');

            logo.setAttribute('src', member.photo);
            logo.setAttribute('alt', `Image of ${member.name}'s logo`);
            logo.setAttribute('loading', 'lazy');

            name.textContent = member.name;
            
            phone.textContent = `Phone: ${member.phone}`;

            website.setAttribute('href', member.website);
            website.textContent = `URL: ${member.website}`;

            tagLine.textContent = member.tag;

            email.textContent = `Email: ${member.email}`;

            card.appendChild(name);
            card.appendChild(tagLine);
            card.appendChild(logo);
            card.appendChild(email);
            card.appendChild(phone);
            card.appendChild(website);
                
            selectedMembers.push(card);
        };
    });

    function shuffleArray(selectedMembers) {
        let shuffled = [...selectedMembers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };


    function getSpotlightMembers(selectedMembers) {
        return shuffleArray(selectedMembers).slice(0, 3);
    };

    let shuffled = shuffleArray(selectedMembers);
    shuffled = getSpotlightMembers(shuffled);

    shuffled.forEach(card =>
        spotlight.appendChild(card));
        
};

getjson("data/members.json").then(spotlightMembers);