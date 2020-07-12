const clock = document.querySelector('.clock');
const focusMinutes = 25;
const toggle = document.getElementById('toggle');

let counter = localStorage.getItem("counter");

// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

if (counter === null){
    localStorage.setItem("counter", JSON.stringify(0));
}

const tick = () => {
    const endTime = JSON.parse(localStorage.getItem("endTime"));
    const now = new Date();
    if (endTime && endTime > now.getTime()) {
        // Show the remaining time and show a stop button.
        const deltaSeconds = Math.round((endTime - now.getTime()) / 1000);
        let m = Math.floor(deltaSeconds / 60).toString();
        let s = (deltaSeconds % 60).toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        if (s.length === 1) {
            s = "0" + s;
        }
        clock.innerHTML = `<span>${m}:${s}</span>`;
        toggle.innerHTML = "<i class=\"fas fa-stop fa-lg\"></i>";
    } else {
        // Show the default time and show a start button.
        clock.innerHTML = `<span>${focusMinutes}:00</span>`;
        toggle.innerHTML = "<i class=\"fas fa-play fa-lg \"></i>\n";
    }
};

// Add a listener to the toggle icon and send a message when the website blocker should start.
const port = chrome.extension.connect({name: "Timer"});
toggle.addEventListener('click', e => {
    port.postMessage(e.target.classList.contains("fa-play"));

    // Increment counter for achievement and check if popup should be shown.
    let counter = JSON.parse(localStorage.getItem("counter"));
    counter++;
    localStorage.setItem("counter", JSON.stringify(counter));
    if (counter === 4){
        modal.style.display = "block";
        localStorage.setItem("counter", JSON.stringify(0))
    }
});

// Create the timer when you open the popup, and refresh every 500 milliseconds.
tick();
setInterval(tick, 500);
