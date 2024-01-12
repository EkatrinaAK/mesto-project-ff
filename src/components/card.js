
//добавляем карточку с картинкой
function createCard(card, callbackDelete, callbackLike, callbackOpenfullImage) {
    const cardTemplete = document.querySelector("#card-template").content;
    const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector(".card__title").textContent = card.name;
  
  // удаление карточки 
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", callbackDelete);
  
  //like
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", callbackLike);
  
    //картинка на экран
    cardImage.addEventListener("click", () => {
      callbackOpenfullImage(card.link,card.name)
    });
  
    return cardElement;
  }
  
  //like
  function likeCard(e) {
    e.target.classList.toggle("card__like-button_is-active");
  }
  
  //удаление карточки
  function removeCard(e) {
    e.target.closest(".card").remove();
  }
   export {createCard, likeCard, removeCard}