const $43d7963e56408b24$var$validator = window.validator;
const $43d7963e56408b24$var$cardNumberInput = document.getElementById("card-number");
const $43d7963e56408b24$var$expiryDateInput = document.getElementById("expiry-date");
const $43d7963e56408b24$var$cvcInput = document.getElementById("cvc");
const $43d7963e56408b24$var$emailInput = document.getElementById("email");
const $43d7963e56408b24$var$payBtn = document.getElementById("pay-btn");
function $43d7963e56408b24$var$getCardType(cardNumber) {
    const firstDigit = cardNumber[0];
    const secondDigit = cardNumber[1];
    if (firstDigit === "4") return "visa";
    else if (firstDigit === "5" && (secondDigit === "1" || secondDigit === "2" || secondDigit === "3" || secondDigit === "4" || secondDigit === "5")) return "mastercard";
    else if (firstDigit === "2" && secondDigit === "2") return "mir";
    else return "unknown";
}
function $43d7963e56408b24$var$validateCardNumber(value) {
    // Валидация номера карты
    return value.replace(/\D/g, "").length === 16;
}
function $43d7963e56408b24$var$validateExpiryDate(value) {
    // Валидация даты окончания действия карты
    const [month, year] = value.split("/");
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = String(currentDate.getFullYear()).slice(2);
    return month >= "01" && month <= "12" && (year > currentYear || year === currentYear && month >= currentMonth);
}
function $43d7963e56408b24$var$validateCVC(value) {
    // Валидация CVC/CVV
    return value.length === 3;
}
function $43d7963e56408b24$var$validateEmail(value) {
    // Валидация email
    return $43d7963e56408b24$var$validator.isEmail(value);
}
function $43d7963e56408b24$var$handleInput(event) {
    const { value: value, id: id } = event.target;
    const cardLogo = document.getElementById("card-logo");
    switch(id){
        case "card-number":
            event.target.value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
            const cardType = $43d7963e56408b24$var$getCardType(value.replace(/\s/g, ""));
            if (cardType !== "unknown") {
                const img = document.createElement("img");
                img.src = $43d7963e56408b24$var$getCardImageUrl(cardType);
                img.alt = cardType;
                img.width = 50;
                cardLogo.innerHTML = "";
                cardLogo.appendChild(img);
            } else cardLogo.innerHTML = "";
            break;
        case "expiry-date":
            event.target.value = value.replace(/\D/g, "").replace(/(\d{2})/, "$1/").replace(/(\d{2})(\d{1,2})/, "$1/$2").replace(/(\d{2})\/(\d{2})\/(\d{1,2})/, "$1/$2");
            break;
        default:
            break;
    }
}
function $43d7963e56408b24$var$getCardImageUrl(cardType) {
    switch(cardType){
        case "visa":
            return "https://www.freepnglogos.com/uploads/verified-by-visa-logo-png-0.png";
        case "mastercard":
            return "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-transparent-png-stickpng-10.png";
        case "mir":
            return "https://w7.pngwing.com/pngs/867/97/png-transparent-national-payment-system-mir-hd-logo-thumbnail.png";
        default:
            return "";
    }
}
function $43d7963e56408b24$var$handleBlur(event) {
    const { value: value, id: id } = event.target;
    const isValid = {
        "card-number": $43d7963e56408b24$var$validateCardNumber(value),
        "expiry-date": $43d7963e56408b24$var$validateExpiryDate(value),
        cvc: $43d7963e56408b24$var$validateCVC(value),
        email: $43d7963e56408b24$var$validateEmail(value)
    }[id];
    if (!isValid) event.target.classList.add("invalid");
    else event.target.classList.remove("invalid");
    const allInputsValid = Array.from(document.querySelectorAll("input")).every((input)=>input.classList.contains("invalid") === false);
    $43d7963e56408b24$var$payBtn.disabled = !allInputsValid;
}
$43d7963e56408b24$var$cardNumberInput.addEventListener("input", $43d7963e56408b24$var$handleInput);
$43d7963e56408b24$var$expiryDateInput.addEventListener("input", $43d7963e56408b24$var$handleInput);
document.querySelectorAll("input").forEach((input)=>{
    input.addEventListener("blur", $43d7963e56408b24$var$handleBlur);
});


//# sourceMappingURL=main.js.map
