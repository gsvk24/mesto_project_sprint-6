const template = document.getElementById("card-template");

export function addCard(
  item,
  deleteCardCallback,
  likeCardCallback,
  openImageCallback,
) {
  const cardElement = template.content.querySelector(".card").cloneNode(true);
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.alt;

  likeBtn.addEventListener("click", () => likeCardCallback(likeBtn));
  deleteBtn.addEventListener("click", () => deleteCardCallback(cardElement));
  image.addEventListener("click", () => openImageCallback(cardElement));

  return cardElement;
}

export const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (card) => {
  card.remove();
};

export function createCard(evt, list, openImage) {
  evt.preventDefault();

  const nameInput = evt.target.querySelector(".popup__input_type_card-name");
  const urlInput = evt.target.querySelector(".popup__input_type_url");

  const newCard = {
    name: nameInput.value.trim(),
    link: urlInput.value.trim(),
  };

  const cardElement = addCard(newCard, deleteCard, likeCard, openImage);
  list.prepend(cardElement);

  const popup = document.querySelector(".popup_is-opened");
  if (popup) {
    popup.classList.remove("popup_is-opened");
    setTimeout(() => {
      popup.classList.remove("popup_is-animated");
    }, 700);
  }

  evt.target.reset();
}
