import { like, unlike, deleteCard } from "./api";

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

  if (card.owner._id === userId){
    deleteButton.addEventListener("click", callbackDelete);
  }else{
    deleteButton.classList.add('card__delete-button-hidden');
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

  if (e.target.classList.contains("card__like-button_is-active")) {
    unlike(cardId);
    count.textContent = parseInt(count.textContent, 10) - 1;
  } else {
    like(cardId);
    count.textContent = parseInt(count.textContent, 10) + 1;
  }
  e.target.classList.toggle("card__like-button_is-active");
}
//удаление карточки
function removeCard(e) {
  const card = e.target.closest(".card");
  const cardId = card.dataset.cardId;
  e.target.closest(".card").remove();
  deleteCard(cardId);

}
export { createCard, likeCard, removeCard };
