// ELEMENTOS
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll("[data-tip]");
const customTipInput = document.querySelector(".custom-tip");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");

let selectedTip = 0;

// FUNCION PRINCIPAL
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    if (bill > 0 && people > 0 && selectedTip >= 0) {

        const tipTotal = (bill * selectedTip) / 100;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill + tipTotal) / people;

        tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

        resetBtn.disabled = false;
    }
}

// BOTONES DE PROPINA
tipButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Quitar selección anterior
        tipButtons.forEach(btn => btn.classList.remove("active"));

        // Marcar actual
        button.classList.add("active");

        selectedTip = parseFloat(button.dataset.tip);

        // Limpiar custom si se selecciona botón
        customTipInput.value = "";

        calculateTip();
    });
});

// CUSTOM TIP
customTipInput.addEventListener("input", () => {
    tipButtons.forEach(btn => btn.classList.remove("active"));

    selectedTip = parseFloat(customTipInput.value) || 0;

    calculateTip();
});

// INPUTS BILL Y PEOPLE
billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

// RESET
resetBtn.addEventListener("click", () => {

    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";

    selectedTip = 0;

    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";

    tipButtons.forEach(btn => btn.classList.remove("active"));

    resetBtn.disabled = true;
});
