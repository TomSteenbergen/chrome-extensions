const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
let distractions = localStorage.getItem("distractions");
const search = document.querySelector('.search input');

if (!distractions) {
    distractions = ["Create your first distraction!"];
    localStorage.setItem("distractions", JSON.stringify(distractions));
} else {
    distractions = JSON.parse(distractions);
}

const generateTemplate = distraction => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center mx-4">
      <span>${distraction}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
};

const filterDistractions = term => {
    // add filtered class
    Array.from(list.children)
        .filter(distraction => !distraction.textContent.toLowerCase().includes(term))
        .forEach(distraction => distraction.classList.add('filtered'));

    // remove filtered class
    Array.from(list.children)
        .filter(distraction => distraction.textContent.toLowerCase().includes(term))
        .forEach(distraction => distraction.classList.remove('filtered'));
};

// Add previously stored or default distractions to html
distractions.forEach(distraction => {
    generateTemplate(distraction)
});


// Add listener for adding new distractions
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const new_distraction = addForm.add.value.trim();
    let distractions = JSON.parse(localStorage.getItem("distractions"));
    if (new_distraction.length) {
        distractions.push(new_distraction);
        localStorage.setItem("distractions", JSON.stringify(distractions));
        generateTemplate(new_distraction);
        addForm.reset();
    }
});

// Add listener for deleting distractions
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let distractions = JSON.parse(localStorage.getItem("distractions"));
        distractions = distractions.filter(item => item !== e.target.parentElement.innerText);
        localStorage.setItem("distractions", JSON.stringify(distractions));
        e.target.parentElement.remove();
    }
});

// filter distractions event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterDistractions(term);
});
