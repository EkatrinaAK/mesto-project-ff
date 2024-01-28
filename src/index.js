import "./pages/index.css"; //настройка css

import { createCard, likeCard, removeCard } from "./components/card.js";
import { openModal, closeModal, closeOverley } from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";
import {
  fetchCards,
  fetchUser,
  newCard,
  updateUser,
  changeAvatar,
} from "./components/api";
import { startPopupLoading, endPopupLoading } from "./components/loading";

const content = document.querySelector(".content");
const pageSection = content.querySelector(".places");
const placesList = pageSection.querySelector(".places__list");

const btnEdit = content.querySelector(".profile__edit-button");
const btnCard = content.querySelector(".profile__add-button");

const profilClose = document.querySelector(".popup_type_edit .popup__close");
const profilPopup = document.querySelector(".popup_type_edit");
const profileformElement = document.querySelector(
  ".popup_type_edit .popup__form"
);

const cardPopup = document.querySelector(".popup_type_new-card");
const closeCard = document.querySelector(".popup_type_new-card .popup__close");
const cardformElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);

const imagePopup = document.querySelector(".popup_type_image");
const closeImage = imagePopup.querySelector(".popup__close");

const popupAvatar = document.querySelector(".popup_avatar");
const btnAvatar = document.querySelector(".profile__image_edit-icon");
const closeAvatar = document.querySelector(".popup_avatar .popup__close");
const avatarForm = document.querySelector("#popup__form-avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

//открыть окно профиля
function openProfile() {
  clearValidation(
    document.querySelector("#popup-edit_profile"),
    validationConfig
  );
  openModal(profilPopup);
  const profTitle = document.querySelector(".profile__title");
  const profDiscr = document.querySelector(".profile__description");
  const inputName = document.querySelector(".popup__input_type_name");
  const inputDiscr = document.querySelector(".popup__input_type_description");
  inputName.value = profTitle.textContent;
  inputDiscr.value = profDiscr.textContent;
}

btnEdit.addEventListener("click", openProfile);

/**
 * редактируем профиль
 * @param evt Аргумент события submit
 * @returns
 */
async function profileSubmit(evt) {
  evt.preventDefault();
  startPopupLoading(profilPopup);
  const profTitle = document.querySelector(".profile__title");
  const profDiscr = document.querySelector(".profile__description");
  const inputName = document.querySelector(".popup__input_type_name");
  const inputDiscr = document.querySelector(".popup__input_type_description");
  profTitle.textContent = inputName.value;
  profDiscr.textContent = inputDiscr.value;
  try {
    await updateUser(inputName.value, inputDiscr.value);
  } catch (err) {
    console.log(err);
    return;
  } finally {
    endPopupLoading(profilPopup);
  }
  closeModal(profilPopup);
}

profileformElement.addEventListener("submit", profileSubmit);

//профиль закрыть
profilClose.addEventListener("click", function () {
  closeModal(profilPopup);
});

//открыть окно новой карточки
function openCard() {
  clearValidation(document.querySelector("#popup__form-add"), validationConfig);
  openModal(cardPopup);
}

btnCard.addEventListener("click", openCard);

/**
 * редактируем карточку
 * @param  evt Аргумент события submit
 * @returns
 */
async function createCardSubmit(evt) {
  evt.preventDefault();
  let createdCard;
  startPopupLoading(cardPopup);
  const inputName = document.querySelector(".popup__input_type_card-name");
  const inputUrl = document.querySelector(".popup__input_type_url");
  try {
    createdCard = await newCard(inputName.value, inputUrl.value);
  } catch (err) {
    console.log(err);
    return;
  } finally {
    endPopupLoading(cardPopup);
  }
  const cardElement = createCard(
    createdCard,
    removeCard,
    likeCard,
    openfullImage
  );
  placesList.prepend(cardElement);
  cardPopup.querySelector(".popup__form").reset();

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

//открываем аватар
function openAvatar() {
  clearValidation(
    document.querySelector("#popup__form-avatar"),
    validationConfig
  );
  openModal(popupAvatar);
}
btnAvatar.addEventListener("click", openAvatar);

//закрываем аватар
closeAvatar.addEventListener("click", () => {
  closeModal(popupAvatar);
});

/**
 * редактируем авватар
 * @param  evt Аргумент события submit
 * @returns
 */
async function avatarSubmit(evt) {
  evt.preventDefault();
  startPopupLoading(popupAvatar);
  const inputUrl = popupAvatar.querySelector(".popup__input_type_url");
  const profile = document.querySelector(".profile");
  const profImage = profile.querySelector(".profile__image");
  try {
    await changeAvatar(inputUrl.value);
  } catch (err) {
    console.log(err);
    return;
  } finally {
    endPopupLoading(popupAvatar);
  }
  profImage.style.backgroundImage = `url(${inputUrl.value})`;
  closeModal(popupAvatar);
}
avatarForm.addEventListener("submit", avatarSubmit);

/**
 * Инициализация профиля и карточек
 */
async function init() {
  let user;
  let cards;
  try {
    user = await fetchUser();
  } catch (err) {
    console.log(err);
    return;
  }
  const profile = document.querySelector(".profile");
  const profTitle = profile.querySelector(".profile__title");
  const profDiscr = profile.querySelector(".profile__description");
  const profImage = profile.querySelector(".profile__image");
  profTitle.textContent = user.name;
  profDiscr.textContent = user.about;
  profile.dataset.userId = user._id;
  profImage.style.backgroundImage = `url(${user.avatar})`;
  try {
    cards = await fetchCards();
  } catch (err) {
    console.log(err);
    return;
  }
  cards.forEach((item) => {
    const cardElement = createCard(item, removeCard, likeCard, openfullImage);
    placesList.append(cardElement);
  });
}

init();
