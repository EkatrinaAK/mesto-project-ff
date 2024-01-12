import "./pages/index.css"; //настройка css
import { initialCards } from "./cards"; // добавление картинок

import {createCard, likeCard, removeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js'; 

const content = document.querySelector(".content");
const pageSection = content.querySelector(".places");
const placesList = pageSection.querySelector(".places__list");

const btnEdit = content.querySelector(".profile__edit-button");
const btnCard = content.querySelector(".profile__add-button");

const profilClose = document.querySelector(".popup_type_edit .popup__close");
const newProfil = document.querySelector(".popup_type_edit");
const profformElement = document.querySelector(".popup_type_edit .popup__form");

const newCard = document.querySelector(".popup_type_new-card");
const closeCard = document.querySelector(".popup_type_new-card .popup__close");
const imgformElement = document.querySelector(".popup_type_new-card .popup__form");

const fullImage = document.querySelector(".popup_type_image");
const closeImage = fullImage.querySelector(".popup__close");

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

//открыть окно новой карточки
function openCard() {
  openModal(newCard);
}

btnCard.addEventListener("click", openCard);

//редактировать окно карточки
function createCardSubmit(evt) {
  evt.preventDefault();
  const inputName = document.querySelector(".popup__input_type_card-name");
  const inputUrl = document.querySelector(".popup__input_type_url");
  const item = {
    name: inputName.value,
    link: inputUrl.value,
  };
  const cardElement = createCard(item, removeCard,likeCard, openfullImage);

  placesList.prepend(cardElement);
  newCard.querySelector('.popup__form').reset();
  closeModal(newCard);
}

imgformElement.addEventListener("submit", createCardSubmit);

//закрыть новую карточку
closeCard.addEventListener("click", function () {
  closeModal(newCard);
});

//открываем картинку
function openfullImage(link, name) {
    const btnImage = fullImage.querySelector(".popup__image");
    const captionImage = document.querySelector(".popup__caption");
    btnImage.src = link;
    btnImage.alt = name;
    captionImage.textContent = name;
    openModal(fullImage);
  }
  
  //закрываем картинку
    closeImage.addEventListener("click", () => {
      closeModal(fullImage);
    });
  
//выводим на экран карточки
initialCards.forEach((item) => {
  const cardElement = createCard(item, removeCard, likeCard, openfullImage);

  placesList.append(cardElement);
});
