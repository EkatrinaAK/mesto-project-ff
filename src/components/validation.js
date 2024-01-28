const profileName = document.querySelector("#nameImput");
const profileDescription = document.querySelector("#descriptionImput");
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');

const showInputError = (config, form, e, errorMessage) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(config.submitButtonSelector);
  formError.classList.add(config.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (config, form, e) => {
  const formError = document.querySelector(`.${e.id}-error`);
  const submitButton = form.querySelector(config.submitButtonSelector);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
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

function hasInvalid(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

function disableButton(button, inactiveButtonClass) {
  button.disabled = true;
  button.classList.add(inactiveButtonClass);
}

function enableButton(button, inactiveButtonClass) {
  button.disabled = false;
  button.classList.remove(inactiveButtonClass);
}

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
  if (hasInvalid(inputs)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function setEvents(config, form, inputSelector, inputErrorClass, errorClass) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(config, form, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
    });
  });
}

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
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      validationConfig,
      formElement,
      inputElement,
      validationConfig
    );
    inputElement.setCustomValidity("");
  });
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
