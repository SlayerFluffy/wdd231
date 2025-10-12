// create and populate gallery image cards
import { pets } from "../data/pets.mjs"
console.log(pets);

// ref div for gallery
const petGallery = document.querySelector('.gallery')

// create cards and display for gallery
function displayPets(pets) {
    pets.forEach(pet => {
        const card = document.createElement('div')

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
        card.appendChild(species)

        const age = document.createElement('p')
        age.innerText = pet.age
        card.appendChild(age)

        const breed = document.createElement('p')
        breed.innerText = pet.breed
        card.appendChild(breed)

        const description = document.createElement('p')
        description.innerText = pet.description
        card.appendChild(description)

        petGallery.appendChild(card)
    })
}

// display cards
displayPets(pets)