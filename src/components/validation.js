const profileName = document.querySelector("#nameImput");
const profileDescription = document.querySelector("#descriptionImput");
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');

const showInputError = (config, form, e, errorMessage) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(config.submitButtonSelector);
  formError.classList.add(config.errorClass);
  formError.textContent = errorMessage;
  submitButton.disabled = true;
};

const hideInputError = (config, form, e) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(config.submitButtonSelector);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
  submitButton.disabled = false;
};

const isValid = (config, form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(config, form, input, input.validationMessage);
  } else {
    hideInputError(config, form, input);
  }
};

/*function hasInvalid(inputs) {
  return inputs.some((input) => !input.validity.valid);
}*/

const setEvents = (
  config,
  form,
  inputSelector,
  inputErrorClass,
  errorClass
) => {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      return isValid(config, form, inputElement, inputErrorClass, errorClass);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEvents(
      config,
      formElement,
      config.inputSelector,
      config.inputErrorClass,
      config.errorClass,
      config.submitButtonSelector,
      config.inactiveButtonClass
    );
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      validationConfig,
      formElement,
      inputElement,
      validationConfig
    );
    inputElement.setCustomValidity("");
    inputElement.value = "";
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
