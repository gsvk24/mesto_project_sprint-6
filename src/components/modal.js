import editProfileForm from "../index";
// @todo 3: Работа модальных окон
// Открытие модального окна редактирования

function openModal(buttonSelector, popupSelector) {
  const button = document.querySelector(buttonSelector);
  button.addEventListener("click", () => {
    const popup = document.querySelector(popupSelector);
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
      popup.classList.add("popup_is-opened");
    }, 1);
    removeDarkBackgroundStyle();
    populateEditForm();
  });
}

openModal(".profile__edit-button", ".popup_type_edit");
openModal(".profile__add-button", ".popup_type_new-card");

// Закрытие модального окна
function closeModal() {
  const closePopupButtons = document.querySelectorAll(".popup__close");

  closePopupButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      removeDarkBackgroundStyle();
      popup.classList.remove("popup_is-opened");
      setTimeout(() => {
        popup.classList.remove("popup_is-animated");
      }, 700);
    });
  });
}

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
    setTimeout(() => {
      openedPopup.classList.remove("popup_is-animated");
    }, 700);
  }
}

editProfileForm.addEventListener("submit", handleFormSubmit);

export { openModal, closeModal };
