export function openModal(buttonSelector, popupSelector) {
  const button = document.querySelector(buttonSelector);
  button.addEventListener("click", () => {
    const popup = document.querySelector(popupSelector);
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
      popup.classList.add("popup_is-opened");
    }, 1);
    populateEditForm();
  });
}

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

export function closeModal() {
  const closeButtons = document.querySelectorAll(".popup__close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      removeDarkBackgroundStyle();
      popup.classList.remove("popup_is-opened");
      setTimeout(() => {
        popup.classList.remove("popup_is-animated");
      }, 600);
    });
  });
}

export function addDarkBackgroundStyle() {
  if (document.getElementById("popup-dark-bg-style")) return;

  const style = document.createElement("style");
  style.id = "popup-dark-bg-style";
  style.textContent = `
    .popup_type_image.popup_is-opened {
      background-color: rgba(0, 0, 0, 0.9);
    }
  `;
  document.head.appendChild(style);
}

export function removeDarkBackgroundStyle() {
  const style = document.getElementById("popup-dark-bg-style");
  if (style) style.remove();
}

export function setupGlobalCloseHandlers() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".popup_is-opened").forEach((popup) => {
        removeDarkBackgroundStyle();
        popup.classList.remove("popup_is-opened");
        setTimeout(() => {
          popup.classList.remove("popup_is-animated");
        }, 600);
      });
    }
  });

  document.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup_is-opened");
    if (popup && !event.target.closest(".popup__content")) {
      removeDarkBackgroundStyle();
      popup.classList.remove("popup_is-opened");
      setTimeout(() => {
        popup.classList.remove("popup_is-animated");
      }, 600);
    }
  });
}
