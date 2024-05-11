document.addEventListener('DOMContentLoaded', function() {
    const inputForm = document.getElementById('inputForm');
    const output = document.getElementById('output');

    // Функция для валидации и форматирования ввода
    function validateAndFormatInput(input) {
        let value = input.value;
        // Удаление всех символов, кроме кириллицы, дефиса и пробела
        value = value.replace(/[^а-яА-ЯёЁ\s-]/g, '');
        // Удаление пробелов и дефисов в начале и конце
        value = value.trim().replace(/\s+/g, ' ').replace(/-+/g, '-');
        // Приведение первой буквы к верхнему регистру, остальных к нижнему
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value;
    }

    // Обработчик события ввода для каждого поля
    const inputs = document.querySelectorAll('#inputForm input');
    inputs.forEach(input => {
        input.addEventListener('input', function(event) {
            // Фильтрация ввода
            this.value = validateAndFormatInput(this);
        });
    });

    // Обработчик события потери фокуса для каждого поля
    inputs.forEach(input => {
        input.addEventListener('blur', function(event) {
            this.value = validateAndFormatInput(this);
        });
    });

    // Обработчик отправки формы
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const surname = document.getElementById('surname').value;
        const name = document.getElementById('name').value;
        const patronymic = document.getElementById('patronymic').value;
        // Добавление нового абзаца с введёнными данными
        const newParagraph = document.createElement('p');
        newParagraph.textContent = `${surname} ${name} ${patronymic}`;
        output.appendChild(newParagraph);
        // Очистка полей формы
        inputForm.reset();
    });
});
