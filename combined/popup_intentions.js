const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
let intentions = localStorage.getItem("intentions");

const generateTemplate = intention => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${intention}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
};

const addFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Add'/>\n" +
    "</form>";

const fullAddFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Cannot add more intentions!'/>\n" +
    "<label class=\"text-light my-2 mx-3\">Already added three intentions. Don't give up and try completing these first before adding a new one!</label>\n" +
    "</form>";

// If there are no intentions yet, input a default intentions.
if (!intentions) {
    intentions = ["Create your first intention!"];
    localStorage.setItem("intentions", JSON.stringify(intentions));
} else {
    intentions = JSON.parse(intentions);
}

// Add previously stored or default intentions to HTML.
intentions.forEach(intention => {
    generateTemplate(intention)
});

// Add a listener for adding new intentions.
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const newIntentions = addForm.add.value.trim();
    let intentions = JSON.parse(localStorage.getItem("intentions"));
    // Only allow a maximum of 3 intentions.
    if (newIntentions.length && intentions.length < 3) {
        intentions.push(newIntentions);
        localStorage.setItem("intentions", JSON.stringify(intentions));
        generateTemplate(newIntentions);
        addForm.reset();
    } else if (newIntentions.length) {
        // Update HTML to show a warning in case a fourth intention is entered.
        addForm.innerHTML = fullAddFormTemplate
    }
});

// Add a listener for deleting intentions.
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let intentions = JSON.parse(localStorage.getItem("intentions"));
        intentions = intentions.filter(item => item !== e.target.parentElement.innerText);
        localStorage.setItem("intentions", JSON.stringify(intentions));
        e.target.parentElement.remove();
    }
    // Update the HTML if there is room to add more intentions.
    if (JSON.parse(localStorage.getItem("intentions")).length <= 2) {
        addForm.innerHTML = addFormTemplate
    }
});
