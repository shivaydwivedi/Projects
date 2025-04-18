function updateClock() {
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const ampm = hrs >= 12 ? "PM" : "AM";

    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // 0 => 12
    hrs = String(hrs).padStart(2, '0');

    const currentTime = `${hrs}:${mins}:${secs} ${ampm}`;
    document.getElementById("clock").textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock(); // initial call

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});
