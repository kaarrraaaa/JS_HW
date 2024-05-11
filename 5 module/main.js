// Создаем массив с значениями карточек
const values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// Перемешиваем массив значений
values.sort(() => Math.random() - 0.5);

// Получаем ссылку на контейнер для карточек
const gameContainer = document.getElementById('game');

// Массив URL изображений карточек
const cardsImgArray = [
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/non-existent.jpg', // Несуществующий URL для теста
];

// Класс для карточки
class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this._cardNumber = cardNumber;
    this.isOpen = false;
    this.isSuccess = false;
    this.createElement(flip);
  }

  createElement(flip) {
    this.element = document.createElement('div');
    this.element.classList.add('card', 'closed');
    this.element.addEventListener('click', () => flip(this));
    this.container.appendChild(this.element);
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.element.dataset.value = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this.isOpen = value;
    if (value) {
      this.element.classList.remove('closed');
      this.element.classList.add('open');
    } else {
      this.element.classList.remove('open');
      this.element.classList.add('closed');
    }
  }

  get open() {
    return this.isOpen;
  }

  set success(value) {
    this.isSuccess = value;
    if (value) {
      this.element.classList.add('success');
    } else {
      this.element.classList.remove('success');
    }
  }

  get success() {
    return this.isSuccess;
  }
}

// Класс AmazingCard, унаследованный от Card
class AmazingCard extends Card {
  set cardNumber(value) {
    super.cardNumber = value;

    const img = document.createElement('img');
    img.src = cardsImgArray[value - 1];

    img.onerror = () => {
      const defaultImg = document.createElement('img');
      defaultImg.src = '/img/default.jpg';
      this.element.appendChild(defaultImg);
      throw new Error('Ошибка загрузки изображения');
    };

    this.element.appendChild(img);
  }
}

// Класс для игры
class Game {
  static instance = null;

  constructor() {
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;
    this.openCards = [];
    this.createCards();
  }

  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  createCards() {
    gameContainer.innerHTML = '';
    values.forEach(value => {
      const card = new AmazingCard(gameContainer, value, this.handleCardClick.bind(this));
    });
  }

  handleCardClick(card) {
    if (card.open || card.success) return;

    card.open = true;
    this.openCards.push(card);

    if (this.openCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [card1, card2] = this.openCards;

    if (card1.cardNumber === card2.cardNumber) {
      card1.success = true;
      card2.success = true;
      this.openCards = [];

      const successCards = document.querySelectorAll('.success');
      if (successCards.length === values.length) {
        alert('Игра окончена! Вы выиграли!');
        this.resetGame();
      }
    } else {
      setTimeout(() => {
        card1.open = false;
        card2.open = false;
        this.openCards = [];
      }, 1000);
    }
  }

  resetGame() {
    values.sort(() => Math.random() - 0.5);
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.remove('open', 'success');
      card.classList.add('closed');
      card.innerHTML = '';
    });
    this.createCards();
  }
}

// Создаем экземпляр игры
const game = Game.getInstance();
