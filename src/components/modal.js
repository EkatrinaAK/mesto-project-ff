
//открыть окно
function openModal(e) {
    e.classList.add("popup_is-opened");
    e.classList.add("popup_is-animated");
    document.addEventListener("keydown",closeESC);

  }
  
  //закрытие окна
  function closeModal(e) {
    e.classList.remove("popup_is-opened");
    e.classList.add("popup_is-animated");
    document.removeEventListener("keydown",closeESC);
  }
  
  //esc
  function closeESC (e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".popup_is-opened");
      closeModal(openModal);
    }
  };
  
  //оверлей
  function closeOverley(e) {
    if (e.target.classList.contains("popup_is-opened")) {
      closeModal(e.target);
    }
  };
  
export {openModal, closeModal, closeOverley}  