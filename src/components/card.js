import { openImage } from "../index.js";
import initialCards from "../scripts/cards.js";
import { addCardForm } from "../index.js";
import { list } from "../index.js";

// @todo: Темплейт карточки
const template = document.getElementById("card-template");
// @todo: Функция создания карточки

function addCard(item, deleteCard, likeCard, openImage) {
  const templateCopy = template.content.querySelector(".card").cloneNode(true);
  const cardHeading = templateCopy.querySelector(".card__title");
  const cardLink = templateCopy.querySelector(".card__image");
  const deleteButton = templateCopy.querySelector(".card__delete-button");
  const likeButton = templateCopy.querySelector(".card__like-button");
  const viewImage = templateCopy.querySelector(".card__image");

  cardHeading.textContent = item.name;
  cardLink.setAttribute("src", item.link);
  cardLink.setAttribute("alt", item.alt);

  if (likeButton) {
    likeButton.addEventListener("click", () => likeCard(likeButton));
  }
  deleteButton.addEventListener("click", () => deleteCard(templateCopy));

  viewImage.addEventListener("click", () => openImage(templateCopy));
  return templateCopy;
}

// @todo 7: Лайк карточки
const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
};

// @todo 6: Добавление карточки

function createCard(evt) {
  evt.preventDefault();

  const placeNameInput = evt.target.querySelector(
    ".popup__input_type_card-name",
  );
  const pictureUrlInput = evt.target.querySelector(".popup__input_type_url");

  const placeNameValue = placeNameInput.value.trim();
  const pictureUrlValue = pictureUrlInput.value.trim();

  const newCard = {
    name: placeNameValue,
    link: pictureUrlValue,
  };

  initialCards.unshift(newCard);

  const cardElement = addCard(newCard, deleteCard, likeCard, openImage);
  list.prepend(cardElement);

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
    setTimeout(() => {
      openedPopup.classList.remove("popup_is-animated");
    }, 700);
  }

  evt.target.reset();
}

addCardForm.addEventListener("submit", createCard);

export { addCard, createCard };
