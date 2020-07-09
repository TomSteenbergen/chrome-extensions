const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
let todaysGoals = localStorage.getItem("todaysGoals");

const generateTemplate = todaysGoal => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todaysGoal}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
};

const addFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Add a goal...'/>\n" +
    "</form>";

const fullAddFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Cannot add more goals!'/>\n" +
    "<label class=\"text-light my-2 mx-3\">Already added three goals. Don't give up and try completing these first before adding a new one!</label>\n" +
    "</form>";

// If there are no goals yet, input a default goal.
if (!todaysGoals) {
    todaysGoals = ["Create your first goal!"];
    localStorage.setItem("todaysGoals", JSON.stringify(todaysGoals));
} else {
    todaysGoals = JSON.parse(todaysGoals);
}

// Add previously stored or default todaysGoals to HTML.
todaysGoals.forEach(todaysGoal => {
    generateTemplate(todaysGoal)
});

// Add a listener for adding new goals.
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const new_todaysGoal = addForm.add.value.trim();
    let todaysGoals = JSON.parse(localStorage.getItem("todaysGoals"));
    // Only allow a maximum of 3 todaysGoals.
    if (new_todaysGoal.length && todaysGoals.length < 3) {
        todaysGoals.push(new_todaysGoal);
        localStorage.setItem("todaysGoals", JSON.stringify(todaysGoals));
        generateTemplate(new_todaysGoal);
        addForm.reset();
    } else if (new_todaysGoal.length) {
        // Update HTML to show a warning in case a fourth goal is entered.
        addForm.innerHTML = fullAddFormTemplate
    }
});

// Add a listener for deleting goals.
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let todaysGoals = JSON.parse(localStorage.getItem("todaysGoals"));
        todaysGoals = todaysGoals.filter(item => item !== e.target.parentElement.innerText);
        localStorage.setItem("todaysGoals", JSON.stringify(todaysGoals));
        e.target.parentElement.remove();
    }
    // Update the HTML if there is room to add more goals.
    if (JSON.parse(localStorage.getItem("todaysGoals")).length <= 2) {
        addForm.innerHTML = addFormTemplate
    }
});
