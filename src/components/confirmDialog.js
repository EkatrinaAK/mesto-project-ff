import { deleteCard } from "./api";
import { openModal, closeModal } from "./modal";
import { startPopupLoading, endPopupLoading } from "./loading";

const popupDelete = document.querySelector(".popup_delete");
const btnDelete = popupDelete.querySelector(".popup__button");
const popupDeleteClose = popupDelete.querySelector(".popup__close");

export function showPopupDelete(cardId) {
  popupDelete.dataset.cardId = cardId;
  openModal(popupDelete);
}

btnDelete.addEventListener("click", async () => {
  startPopupLoading(popupDelete);
  const cardId = popupDelete.dataset.cardId;
  const cardToRemove = document.querySelector(
    `.places__list .card[data-card-id="${cardId}"]`
  );
  try {
    await deleteCard(cardId);
  } catch (err) {
    console.log(err);
    return;
  } finally {
    endPopupLoading(popupDelete);
  }
  cardToRemove.remove();
  closeModal(popupDelete);
});

popupDeleteClose.addEventListener("click", () => {
  closeModal(popupDelete);
});
