const changeBtn = document.getElementById('change-btn');
const colorCodeText = document.getElementById('color-code');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const gradientCheck = document.getElementById('gradient-check');

function getRandomColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return '#' + hex.padStart(6, '0');
}

function getGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return {
        gradient: `linear-gradient(to right, ${color1}, ${color2})`,
        display: `${color1} → ${color2}`
    };
}

changeBtn.addEventListener('click', () => {
    if (gradientCheck.checked) {
        const gradient = getGradient();
        document.body.style.background = gradient.gradient;
        colorCodeText.textContent = gradient.display;
    } else {
        const color = getRandomColor();
        document.body.style.background = color;
        colorCodeText.textContent = color;
    }
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Toggle icon
    if (themeIcon.classList.contains('fa-moon')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});
