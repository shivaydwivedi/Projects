function calculateTip() {
    const bill = parseFloat(document.getElementById("billAmount").value);
    const tipPercent = parseFloat(document.getElementById("tipPercent").value);

    if (isNaN(bill) || isNaN(tipPercent)) {
        alert("Please enter valid numbers for both fields.");
        return;
    }

    const tipAmount = (bill * tipPercent) / 100;
    const totalAmount = bill + tipAmount;

    document.getElementById("tipAmount").innerText = tipAmount.toFixed(2);
    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});
