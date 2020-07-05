const clock = document.querySelector('.clock');
const focusMinutes = 25;
const toggle = document.getElementById('toggle');

const tick = () => {
    const endTime = JSON.parse(localStorage.getItem("endTime"));
    const now = new Date();
    if (endTime && endTime > now.getTime()) {
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
        clock.innerHTML = `<span>${focusMinutes}:00</span>`;
        toggle.innerHTML = "<i class=\"fas fa-play fa-lg \"></i>\n";
    }
};

const port = chrome.extension.connect({name: "Timer"});
toggle.addEventListener('click', e => {
    port.postMessage(e.target.classList.contains("fa-play"))
});

setInterval(tick, 200);
