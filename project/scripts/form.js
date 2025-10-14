// create drop list for animal based on radio box.
import { pets } from "../data/pets.mjs"

const radioOption = document.querySelector(".speciesRadio")
const dropMenu = document.querySelector("#pets")

function filterPets(pets) {
    // return a string of <option> elements
    return pets
        .map(pet => `<option value="${pet.name}">${pet.name}</option>`)
        .join('');
}

radioOption.addEventListener('click', () => {
    const selected = document.querySelector('input[name="species"]:checked');
    if (selected && selected.value === 'cat') {
        dropMenu.innerHTML = `
            <option value="" disabled selected>Choose a cat</option>
            ${filterPets(pets.filter(p => p.species.toLowerCase() === "cat"))}
            `;
    } else if (selected && selected.value === 'dog') {
        dropMenu.innerHTML = `
            <option value="" disabled selected>Choose a dog</option>
            ${filterPets(pets.filter(p => p.species.toLowerCase() === "dog"))}
            `;
    } else {
        dropMenu.innerHTML = '<option value="" disabled selected>Select an animal</option>';
    }
});

const form = document.querySelector('.adoptionForm');
if (form) {
    form.addEventListener('submit', () => {
        const timestamp = new Date().toISOString();

        // ensure a hidden input named submittedAt exists so the timestamp is included in the form data
        let hidden = form.querySelector('input[name="submittedAt"]');
        if (!hidden) {
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'submittedAt';
            form.appendChild(hidden);
        }
        hidden.value = timestamp;

        // save the timestamp to localStorage
        localStorage.setItem('formSubmissionTime', timestamp);
    });
}



const STORAGE_KEY = 'pawfect_adoption_form_v1';
    const get = sel => form.querySelector(sel);
    const field = name => form.querySelector('[name="' + name + '"]');
    const petsSelect = document.getElementById('pets');

    function readFormData() {
    return {
        fname: (get('input[name="fname"]')?.value) || '',
        lname: (get('input[name="lname"]')?.value) || '',
        email: (get('input[name="email"]')?.value) || '',
        phone: (get('input[type="tel"]')?.value) || '',
        species: (get('input[name="species"]:checked')?.value) || '',
        pets: (petsSelect?.value) || '',
        address: (field('address')?.value) || '',
        city: (field('city')?.value) || '',
        state: (field('state')?.value) || '',
        zip: (field('zip')?.value) || '',
        housing: (field('housing')?.value) || '',
        yard: (get('input[name="yard"]:checked')?.value) || '',
        otherHousehold: (field('otherHousehold')?.value) || '',
        comments: (field('comments')?.value) || ''
    };
    }

    function saveFormData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readFormData()));
    } catch (e) {
        console.warn('Could not save form to localStorage', e);
    }
    }

    function populateForm() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    if (data.fname) field('fname').value = data.fname;
    if (data.lname) field('lname').value = data.lname;
    if (data.email) field('email').value = data.email;
    if (data.phone) form.querySelector('input[type="tel"]').value = data.phone;
    if (data.species) {
        const radio = form.querySelector('input[name="species"][value="' + data.species + '"]');
        if (radio) radio.checked = true;
    }
    if (data.address) field('address').value = data.address;
    if (data.city) field('city').value = data.city;
    if (data.state) field('state').value = data.state;
    if (data.zip) field('zip').value = data.zip;
    if (data.housing) field('housing').value = data.housing;
    if (data.yard) {
        const y = form.querySelector('input[name="yard"][value="' + data.yard + '"]');
        if (y) y.checked = true;
    }
    if (data.otherHousehold) field('otherHousehold').value = data.otherHousehold;
    if (data.comments) field('comments').value = data.comments;

    // pets select may be populated by other script. If stored value exists but isn't an option yet, add & select it.
    if (data.pets) {
        const opt = Array.from(petsSelect.options).find(o => o.value === data.pets);
        if (opt) {
        petsSelect.value = data.pets;
        } else {
        const newOpt = document.createElement('option');
        newOpt.value = data.pets;
        newOpt.textContent = data.pets + ' (previous selection)';
        petsSelect.appendChild(newOpt);
        petsSelect.value = data.pets;
        }
    }
    }

    // Save on input/change events (debounced)
    let saveTimer = null;
    function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveFormData, 300);
    }

    form.addEventListener('input', scheduleSave);
    form.addEventListener('change', scheduleSave);

    // ensure populate runs after any other scripts that may fill the pet list
    window.addEventListener('load', () => {
    populateForm();
    });

    // Save right before navigating to thankyou page
    form.addEventListener('submit', (e) => {
    saveFormData();
    });