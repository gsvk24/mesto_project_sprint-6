import initialCards from "./scripts/cards";
import "./pages/index.css";

// @todo: Темплейт карточки
const template = document.getElementById("card-template");

// @todo: DOM узлы
const list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(item, deleteCard) {
  const templateCopy = template.content.querySelector(".card").cloneNode(true);

  const cardHeading = templateCopy.querySelector(".card__title");
  const cardLink = templateCopy.querySelector(".card__image");
  const deleteButton = templateCopy.querySelector(".card__delete-button");

  cardHeading.textContent = item.name;
  cardLink.setAttribute("src", item.link);
  cardLink.setAttribute("alt", item.alt);

  deleteButton.addEventListener("click", () => deleteCard(templateCopy));
  return templateCopy;
}

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  list.append(addCard(item, deleteCard));
});

// @todo 3: Работа модальных окон
// Открытие модального окна редактирования

function openPopup(buttonSelector, popupSelector) {
  const button = document.querySelector(buttonSelector);
  button.addEventListener("click", () => {
    const popup = document.querySelector(popupSelector);
    popup.classList.add("popup_is-opened");
  });

  // Закрытие попапа кликом на 'Escape'

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openPopups = document.querySelectorAll(".popup_is-opened");
      openPopups.forEach((popup) => {
        popup.classList.remove("popup_is-opened");
      });
    }
  });
}

openPopup(".profile__edit-button", ".popup_type_edit");
openPopup(".profile__add-button", ".popup_type_new-card");
openPopup(".profile__image", ".popup_type_image");

// Закрытие модального окна
(function () {
  const closePopupButtons = document.querySelectorAll(".popup__close");

  closePopupButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      popup.classList.remove("popup_is-opened");
    });
  });

  // Обработчик закрытия при клике на оверлей
  document.addEventListener("click", (event) => {
    const openedPopup = event.target.closest(".popup_is-opened");

    if (openedPopup && !event.target.closest(".popup__content")) {
      openedPopup.classList.remove("popup_is-opened");
    }
  });
})();
