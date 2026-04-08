import initialCards from "./scripts/cards";
import "./pages/index.css";

// Форма редактирования профиля
const editProfileForm = document.querySelector('form[name="edit-profile"]');
// Форма добавления карточки
const addCardForm = document.querySelector('form[name="new-place"]');

// @todo: Темплейт карточки
const template = document.getElementById("card-template");

// @todo: DOM узлы
const list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(item, deleteCard, likeCard) {
  const templateCopy = template.content.querySelector(".card").cloneNode(true);

  const cardHeading = templateCopy.querySelector(".card__title");
  const cardLink = templateCopy.querySelector(".card__image");
  const deleteButton = templateCopy.querySelector(".card__delete-button");
  const likeButton = templateCopy.querySelector(".card__like-button");

  cardHeading.textContent = item.name;
  cardLink.setAttribute("src", item.link);
  cardLink.setAttribute("alt", item.alt);

  if (likeButton && typeof likeCard === "function") {
    likeButton.addEventListener("click", () => likeCard(likeButton));
  } else {
    console.error("likeCard is not a function or likeButton not found", {
      likeCard,
      likeButton,
    });
  }
  deleteButton.addEventListener("click", () => deleteCard(templateCopy));
  return templateCopy;
}

const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  list.append(addCard(item, deleteCard, likeCard));
});

// @todo 3: Работа модальных окон
// Открытие модального окна редактирования

function openPopup(buttonSelector, popupSelector) {
  const button = document.querySelector(buttonSelector);
  button.addEventListener("click", () => {
    const popup = document.querySelector(popupSelector);
    popup.classList.add("popup_is-opened");
    populateEditForm();
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

// @todo 4: Редактирование имени и информации о себе

// Заполнение формы элементами страницы

function populateEditForm() {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const nameInput = document.querySelector(
    'form[name="edit-profile"] [name="name"]',
  );
  const descriptionInput = document.querySelector(
    'form[name="edit-profile"] [name="description"]',
  );

  if (profileName && profileDescription && nameInput && descriptionInput) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  // Ищем поля внутри текущей формы
  const nameInput = evt.target.querySelector(".popup__input_type_name");
  const jobInput = evt.target.querySelector(".popup__input_type_description");

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
  }
}

editProfileForm.addEventListener("submit", handleFormSubmit);

// todo 6: Добавление карточки

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

  const cardElement = addCard(newCard, deleteCard, likeCard);
  list.prepend(cardElement);

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
  }

  evt.target.reset();
}

addCardForm.addEventListener("submit", createCard);

// todo 7: Лайк карточки
