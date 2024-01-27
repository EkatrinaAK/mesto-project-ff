import "./pages/index.css"; //настройка css
import { initialCards } from "./cards"; // добавление картинок

import {createCard, likeCard, removeCard} from './components/card.js';
import {openModal, closeModal, closeOverley} from './components/modal.js'; 

import {enableValidation} from './components/validation.js';


const content = document.querySelector(".content");
const pageSection = content.querySelector(".places");
const placesList = pageSection.querySelector(".places__list");

const btnEdit = content.querySelector(".profile__edit-button");
const btnCard = content.querySelector(".profile__add-button");

const profilClose = document.querySelector(".popup_type_edit .popup__close");
const profilPopup = document.querySelector(".popup_type_edit");
const profileformElement = document.querySelector(".popup_type_edit .popup__form");

const cardPopup = document.querySelector(".popup_type_new-card");
const closeCard = document.querySelector(".popup_type_new-card .popup__close");
const cardformElement = document.querySelector(".popup_type_new-card .popup__form");

const imagePopup = document.querySelector(".popup_type_image");
const closeImage = imagePopup.querySelector(".popup__close");

const ValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'

}
enableValidation(ValidationConfig);

//открыть окно профиля
function openProfile() {
  openModal(profilPopup);
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
  closeModal(profilPopup);
}

profileformElement.addEventListener("submit", profileSubmit); // событие

//профиль закрыть
profilClose.addEventListener("click", function () {
  closeModal(profilPopup);
});

//открыть окно новой карточки
function openCard() {
  openModal(cardPopup);
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
  cardPopup.querySelector('.popup__form').reset();
  closeModal(cardPopup);
}

cardformElement.addEventListener("submit", createCardSubmit);

//закрыть новую карточку
closeCard.addEventListener("click", function () {
  closeModal(cardPopup);
});

//открываем картинку
function openfullImage(link, name) {
    const btnImage = imagePopup.querySelector(".popup__image");
    const captionImage = document.querySelector(".popup__caption");
    btnImage.src = link;
    btnImage.alt = name;
    captionImage.textContent = name;
    openModal(imagePopup);
  }
  
  //закрываем картинку
    closeImage.addEventListener("click", () => {
      closeModal(imagePopup);
    });
    
    //закрытие по оверлей
    document.addEventListener("click", closeOverley);
  
//выводим на экран карточки
initialCards.forEach((item) => {
  const cardElement = createCard(item, removeCard, likeCard, openfullImage);

  placesList.append(cardElement);
});
