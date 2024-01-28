import { like, unlike, deleteCard } from "./api";
import { startPopupLoading, endPopupLoading } from "./loading";
import { openModal, closeModal } from "./modal";

//добавляем карточку с картинкой
function createCard(card, callbackDelete, callbackLike, callbackOpenfullImage) {
  const cardTemplete = document.querySelector("#card-template").content;
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  const profile = document.querySelector(".profile");
  const userId = profile.dataset.userId;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;

  // удаление карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", callbackDelete);

  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", callbackDelete);
  } else {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  //like
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", callbackLike);

  const likeCount = cardElement.querySelector(".count_like");
  likeCount.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  //картинка на экран
  cardImage.addEventListener("click", () => {
    callbackOpenfullImage(card.link, card.name);
  });
  return cardElement;
}
//like
function likeCard(e) {
  const card = e.target.closest(".card");
  const cardId = card.dataset.cardId;
  const count = card.querySelector(".count_like");
  try {
    if (e.target.classList.contains("card__like-button_is-active")) {
      unlike(cardId);
      count.textContent = parseInt(count.textContent, 10) - 1;
    } else {
      like(cardId);
      count.textContent = parseInt(count.textContent, 10) + 1;
    }
  } catch (err) {
    console.log(err);
  }
  e.target.classList.toggle("card__like-button_is-active");
}
//удаление карточки
function removeCard(e) {
  const card = e.target.closest(".card");
  popupDelete.dataset.cardId = card.dataset.cardId;
  openModal(popupDelete);
}

const popupDelete = document.querySelector(".popup_delete");
const btnDelete = popupDelete.querySelector(".popup__button");
const popupDeleteClose = popupDelete.querySelector(".popup__close");

btnDelete.addEventListener("click", async () => {
  startPopupLoading(popupDelete);
  const cardId = popupDelete.dataset.cardId;
  const cardToRemove = document.querySelector(
    `.places__list .card[data-card-id="${cardId}"]`
  );
  cardToRemove.remove();
  try {
    await deleteCard(cardId);
  } catch (err) {
    console.log(err);
    return;
  } finally {
    endPopupLoading(popupDelete);
  }
  closeModal(popupDelete);
});

popupDeleteClose.addEventListener("click", () => {
  closeModal(popupDelete);
});
export { createCard, likeCard, removeCard };
