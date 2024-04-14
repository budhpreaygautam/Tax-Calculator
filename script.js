document.addEventListener("DOMContentLoaded", function () {
    const taxForm = document.getElementById('taxForm');
    const modal = document.getElementById('myModal');
    const closeButton = document.querySelector('.close');
    const taxResult = document.getElementById('taxResult');

    taxForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            showModal();
            calculateTax();
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = taxForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            const value = input.value.trim();
            if (value === '') {
                input.nextElementSibling.style.display = 'inline';
                isValid = false;
            } else {
                input.nextElementSibling.style.display = 'none';
            }
        });
        return isValid;
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);
        const age = document.getElementById('age').value;

        let taxableIncome = grossIncome + extraIncome - deductions - 800000; // Deduct 8 Lakhs from taxable income
        if (taxableIncome < 0) {
            taxableIncome = 0; // If taxable income is negative, set it to 0
        }

        let taxRate;
        if (age === "<40") {
            taxRate = 0.3;
        } else if (age === "≥40 & <60") {
            taxRate = 0.4;
        } else if (age === "≥60") {
            taxRate = 0.1;
        }

        const taxAmount = taxableIncome > 0 ? (taxableIncome * taxRate) : 0;

        taxResult.innerHTML = `Tax Amount: ${taxAmount.toFixed(2)} Lakhs`;
    }

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
