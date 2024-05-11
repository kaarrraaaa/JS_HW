document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const dropdownBlock = document.getElementById('dropdownBlock');

    // Функция для открытия/закрытия выпадающего блока
    function toggleDropdown() {
        if (dropdownBlock.style.display === 'none') {
            dropdownBlock.style.display = 'block';
        } else {
            dropdownBlock.style.display = 'none';
        }
    }

    // Обработчик клика по кнопке
    toggleButton.addEventListener('click', function(event) {
        toggleDropdown();
    });

    // Обработчик клика вне выпадающего блока
    document.addEventListener('click', function(event) {
        if (!dropdownBlock.contains(event.target) && !toggleButton.contains(event.target)) {
            dropdownBlock.style.display = 'none';
        }
    });
});
