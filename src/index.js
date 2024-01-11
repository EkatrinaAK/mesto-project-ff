import "./pages/index.css"; //настройка css
import { initialCards } from "./cards"; // добавление картинок

const content = document.querySelector(".content");
const pageSection = content.querySelector(".places");
const placesList = pageSection.querySelector(".places__list");

const btnEdit = content.querySelector(".profile__edit-button");
const btnCard = content.querySelector(".profile__add-button");

const profilClose = document.querySelector(".popup_type_edit .popup__close");
const closeCard = document.querySelector(".popup_type_new-card .popup__close");

const newCard = document.querySelector(".popup_type_new-card");
const newProfil = document.querySelector(".popup_type_edit");
const profformElement = document.querySelector(".popup__form");
const fullImage = document.querySelector(".popup_type_image");
const btnImage = fullImage.querySelector(".popup__image");
const captionImage = document.querySelector(".popup__caption");
const closeImage = fullImage.querySelector(".popup__close");

//открыть окно
function openModal(e) {
    e.classList.add("popup_is-opened");
  }

  //закрытие окна
function closeModal(e) {
    e.classList.remove("popup_is-opened");
  }
  
  //esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".popup_is-opened");
      closeModal(openModal);
    }
  });
  
  //оверлей
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup_is-opened")) {
      closeModal(e.target);
    }
  });


//открыть окно профиля
function openProfile() {
  openModal(newProfil);
  const profTitle = document.querySelector(".profile__title");
  const profDiscr = document.querySelector(".profile__description");
  const inputName = document.querySelector(".popup__input_type_name");
  const inputDiscr = document.querySelector(".popup__input_type_description");
  inputName.value = profTitle.textContent;
  inputDiscr.value = profDiscr.textContent;
}

btnEdit.addEventListener("click", openProfile);

//редактирование профиля
function profileSubmit(evt) {
  evt.preventDefault();
  const profTitle = document.querySelector(".profile__title");
  const profDiscr = document.querySelector(".profile__description");
  const inputName = document.querySelector(".popup__input_type_name");
  const inputDiscr = document.querySelector(".popup__input_type_description");
  profTitle.textContent = inputName.value;
  profDiscr.textContent = inputDiscr.value;
  closeModal(newProfil);
}

profformElement.addEventListener("submit", profileSubmit); // событие

//профиль закрыть
profilClose.addEventListener("click", function () {
  closeModal(newProfil);
});

//открываем картинку
function openfullImage(link, name) {
  btnImage.src = link;
  btnImage.alt = name;
  captionImage.textContent = name;
  openModal(fullImage);
}

//карточка
btnCard.addEventListener("click", () => {
  openModal(newCard);
});
//закрыть карточку
closeCard.addEventListener("click", () => {
  closeModal(newCard);
});

//like
function likeCard(e) {
  e.classList.add(".card__like-button_is-active");
}

//добавляем карточку с картинкой
function createCard(card, callback) {
  const cardTemplete = document.querySelector("#card-template").content;
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", callback);

  //like
  cardElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__like-button")) {
      e.target.classList.toggle("card__like-button_is-active");
      likeCard(e.target);
    }
  });

  //картинка на экран
  cardImage.addEventListener("click", () => {
    openfullImage(card.link, card.name, card.name);
  });
  closeImage.addEventListener("click", () => {
    closeModal(fullImage);
  });
  return cardElement;
}

//удаление карточки
function removeCard(e) {
  e.target.closest(".card").remove();
}

//выводим на экран
initialCards.forEach((item) => {
  const cardElement = createCard(item, removeCard);

  placesList.append(cardElement);
});
