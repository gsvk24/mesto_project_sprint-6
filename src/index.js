import "./pages/index.css";
import initialCards from "./scripts/cards";
import { addCard, createCard, likeCard, deleteCard } from "./components/card";
import {
  openModal,
  closeModal,
  setupGlobalCloseHandlers,
  addDarkBackgroundStyle,
} from "./components/modal";

const editProfileForm = document.querySelector('form[name="edit-profile"]');
const addCardForm = document.querySelector('form[name="new-place"]');
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const openImage = (cardElement) => {
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const popup = document.querySelector(".popup_type_image");

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;

  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  addDarkBackgroundStyle();
};

initialCards.forEach((cardData) => {
  placesList.append(addCard(cardData, deleteCard, likeCard, openImage));
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent =
    editProfileForm.querySelector("[name='name']").value;
  profileDescription.textContent = editProfileForm.querySelector(
    "[name='description']",
  ).value;

  const popup = document.querySelector(".popup_is-opened");
  if (popup) {
    popup.classList.remove("popup_is-opened");
    setTimeout(() => {
      popup.classList.remove("popup_is-animated");
    }, 600);
  }
});

addCardForm.addEventListener("submit", (evt) => {
  createCard(evt, placesList, openImage);
});

openModal(".profile__edit-button", ".popup_type_edit");
openModal(".profile__add-button", ".popup_type_new-card");
closeModal();
setupGlobalCloseHandlers();
