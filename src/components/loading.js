/**
 * Начать загрузку
 * @param {*} popup - Попап содержащий кнопку дейсвия
 */
export function startPopupLoading(popup) {
  const button = popup.querySelector(".popup__button");
  button.disabled = true;
  const loadingText = popup.dataset.loadingButtonText ?? "Loading...";
  popup.dataset.loadingButtonPrevText = button.textContent;
  button.textContent = loadingText;
}

/**
 * Закончить загрузку
 * @param {*} popup - Попап содержащий кнопку дейсвия
 */
export function endPopupLoading(popup) {
  const button = popup.querySelector(".popup__button");
  button.disabled = false;
  button.textContent = popup.dataset.loadingButtonPrevText;
}
