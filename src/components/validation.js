const profileName = document.querySelector("#nameImput");
const profileDescription = document.querySelector("#descriptionImput");
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');

const showInputError = (form, e, errorMessage) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(".popup__button");
  formError.classList.add("popup_input-error_visible");
  formError.textContent = errorMessage;
  submitButton.disabled = true;
};
const hideInputError = (form, e) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(".popup__button");
  formError.classList.remove("popup_input-error_visible");
  formError.textContent = "";
  submitButton.disabled = false;
};

const isValid = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

function hasInvalid(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

const setEvents = (
  form,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      return isValid(form, inputElement, inputErrorClass, errorClass);
      //toggleButtonState(inputs, submitButton, inactiveButtonClass);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    /*formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });*/
    setEvents(
      formElement,
      config.inputSelector,
      config.inputErrorClass,
      config.errorClass,
      config.submitButtonSelector,
      config.inactiveButtonClass
    );
  });
};
