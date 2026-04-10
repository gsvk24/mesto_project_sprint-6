import "./pages/index.css";
import initialCards from "./scripts/cards";
import { addCard } from "./components/card";

const editProfileForm = document.querySelector('form[name="edit-profile"]');
const addCardForm = document.querySelector('form[name="new-place"]');
const list = document.querySelector(".places__list");

// @todo: Вызов функции создания карточки

initialCards.forEach(function (item) {
  list.append(addCard(item, deleteCard, likeCard, openImage));
});
// @todo 8: Открытие попапа с картинкой
const openImage = (cardElement) => {
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__title");
  const popupImage = document.querySelector(".popup__image");
  const popupImageDescription = document.querySelector(".popup__caption");
  const popup = document.querySelector(".popup_type_image");

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageDescription.textContent = cardDescription.textContent;

  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  addDarkBackgroundStyle();
};

function addDarkBackgroundStyle() {
  if (document.getElementById("popup-dark-bg-style")) {
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = "popup-dark-bg-style";
  styleElement.textContent = `
    .popup_type_image.popup_is-opened {
      background-color: rgba(0, 0, 0, 0.9);
    }
  `;
  document.head.appendChild(styleElement);
}

function removeDarkBackgroundStyle() {
  const styleElement = document.getElementById("popup-dark-bg-style");
  if (styleElement) {
    styleElement.remove();
  }
}
// Закрытие попапа кликом на 'Escape'
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup_is-opened");
    openPopups.forEach((popup) => {
      removeDarkBackgroundStyle();
      popup.classList.remove("popup_is-opened");
      setTimeout(() => {
        popup.classList.remove("popup_is-animated");
      }, 700);
    });
  }
});

// Обработчик закрытия при клике на оверлей
document.addEventListener("click", (event) => {
  const openedPopup = event.target.closest(".popup_is-opened");

  if (openedPopup && !event.target.closest(".popup__content")) {
    removeDarkBackgroundStyle();
    openedPopup.classList.remove("popup_is-opened");
    setTimeout(() => {
      openedPopup.classList.remove("popup_is-animated");
    }, 700);
  }
});

export {
  openImage,
  editProfileForm,
  addDarkBackgroundStyle,
  removeDarkBackgroundStyle,
  addCardForm,
  list,
};
