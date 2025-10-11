import { attractions } from "../data/attractions.mjs"
console.log(attractions);

// reference div to display items
const addCont = document.querySelector('.attractions')

// get content from json file
function displayItems(attractions) {
    attractions.forEach(place => {
        const card = document.createElement('div')

        const name = document.createElement('h2')
        name.innerText = place.name
        card.appendChild(name)

        const picfig = document.createElement('figure')

        const pic = document.createElement('img')
        pic.src = `${place.photo}`
        pic.alt = place.name
        pic.loading = "lazy"
        picfig.appendChild(pic)
        card.appendChild(picfig)

        const address = document.createElement('address')
        address.innerText = place.address
        card.appendChild(address)

        const description = document.createElement('p')
        description.innerText = place.description
        card.appendChild(description)

        const button = document.createElement('button')
        button.innerText = "learn more"
        card.appendChild(button)

        addCont.appendChild(card)
    })
}

// display items
displayItems(attractions)
