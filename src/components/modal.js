
//открыть окно
function openModal(e) {
    e.classList.add("popup_is-opened");
    e.classList.add("popup_is-animated");
  }
  
  //закрытие окна
  function closeModal(e) {
    e.classList.remove("popup_is-opened");
    e.classList.add("popup_is-animated");
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
  
export {openModal, closeModal}  