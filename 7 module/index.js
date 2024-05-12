import validator from 'validator';
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvcInput = document.getElementById('cvc');
const emailInput = document.getElementById('email');
const payBtn = document.getElementById('pay-btn');


function loadCardLogo(cardType) {
    const cardLogo = document.getElementById('card-logo');
    const img = new Image();
    img.onload = function() {
      cardLogo.innerHTML = '';
      cardLogo.appendChild(img);
    };
    img.onerror = function() {
      cardLogo.innerHTML = '';
    };
    img.src = `${cardType}.png`;
  }
  

function getCardType(cardNumber) {
    const firstDigit = cardNumber[0];
    const secondDigit = cardNumber[1];
  
    if (firstDigit === '4') {
      return 'visa';
    } else if (firstDigit === '5' && (secondDigit === '1' || secondDigit === '2' || secondDigit === '3' || secondDigit === '4' || secondDigit === '5')) {
      return 'mastercard';
    } else if (firstDigit === '2' && secondDigit === '2') {
      return 'mir';
    } else {
      return 'unknown';
    }
  }
  

function validateCardNumber(value) {
  // Валидация номера карты
  return value.replace(/\D/g, '').length === 16;
}

function validateExpiryDate(value) {
  // Валидация даты окончания действия карты
  const [month, year] = value.split('/');
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = String(currentDate.getFullYear()).slice(2);

  return (
    month >= '01' &&
    month <= '12' &&
    (year > currentYear || (year === currentYear && month >= currentMonth))
  );
}

function validateCVC(value) {
  // Валидация CVC/CVV
  return value.length === 3;
}

function validateEmail(value) {
  // Валидация email
  return validator.isEmail(value);
}

function handleInput(event) {
    const { value, id } = event.target;
    const cardLogo = document.getElementById('card-logo');
  
    switch (id) {
      case 'card-number':
        event.target.value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        const cardType = getCardType(value.replace(/\s/g, ''));
        cardLogo.innerHTML = cardType !== 'unknown' ? `<img src="${cardType}.png" alt="${cardType}" width="50">` : '';
        break;
      case 'expiry-date':
        event.target.value = value
          .replace(/\D/g, '')
          .replace(/(\d{2})/, '$1/')
          .replace(/(\d{2})(\d{1,2})/, '$1/$2')
          .replace(/(\d{2})\/(\d{2})\/(\d{1,2})/, '$1/$2');
        break;
      default:
        break;
    }
  }
  
  

function handleBlur(event) {
  const { value, id } = event.target;
  const isValid = {
    'card-number': validateCardNumber(value),
    'expiry-date': validateExpiryDate(value),
    cvc: validateCVC(value),
    email: validateEmail(value),
  }[id];

  if (!isValid) {
    event.target.classList.add('invalid');
  } else {
    event.target.classList.remove('invalid');
  }

  const allInputsValid = Array.from(document.querySelectorAll('input')).every(
    (input) => input.classList.contains('invalid') === false
  );
  payBtn.disabled = !allInputsValid;
}
cardNumberInput.addEventListener('input', handleInput);
expiryDateInput.addEventListener('input', handleInput);
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', handleBlur);
});
