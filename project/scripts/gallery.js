// create and populate gallery image cards
import { pets } from "../data/pets.mjs"
console.log(pets);

// ref div for gallery
const petGallery = document.querySelector('.gallery')

// create cards and display for gallery
function displayPets(pets) {
    petGallery.innerHTML=""
    pets.forEach(pet => {
        const card = document.createElement('div')
        card.classList.add('card')

        const pic = document.createElement('img')
        pic.src = pet.image
        pic.alt = pet.name
        pic.loading = "lazy"
        card.appendChild(pic)

        const name = document.createElement('h3')
        name.innerText = pet.name
        card.appendChild(name)

        const species = document.createElement('span')
        species.innerText = pet.species
        species.style.display = "none";
        card.appendChild(species)

        const age = document.createElement('p')
        age.innerText = pet.age
        card.appendChild(age)

        const breed = document.createElement('p')
        breed.innerText = pet.breed
        card.appendChild(breed)

        const modal = document.createElement('dialog')
        modal.classList.add("cardModal")

        const description = document.createElement('p')
        description.innerText = pet.description
        modal.appendChild(description)

        const button = document.createElement('button')
        button.classList.add('closeModal')
        button.innerText = 'Close'
        modal.appendChild(button)

        const adopt = document.createElement('a')
        adopt.innerText = 'Adopt me!'
        adopt.href = 'apply.html'
        modal.appendChild(adopt)

        // open this card's modal when the card is clicked
        card.addEventListener('click', () => {
            modal.showModal();
        });

        // close the modal when its close button is clicked and prevent the click from bubbling back to the card
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.close();
        });

        card.appendChild(modal);

        petGallery.appendChild(card)
    })
};

displayPets(pets);


// --- Filter logic ---

// button references
const allBtn = document.querySelector('.allButton')
const dogBtn = document.querySelector('.dogButton')
const catBtn = document.querySelector('.catButton')

// event listeners
allBtn.addEventListener('click', () => displayPets(pets))
dogBtn.addEventListener('click', () => displayPets(pets.filter(p => p.species.toLowerCase() === "dog")))
catBtn.addEventListener('click', () => displayPets(pets.filter(p => p.species.toLowerCase() === "cat")))

// initial load
displayPets(pets)