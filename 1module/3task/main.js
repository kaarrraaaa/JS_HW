// Функция для плавной прокрутки наверх
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // Обработчик события прокрутки
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { 
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    }, { passive: true });
});

