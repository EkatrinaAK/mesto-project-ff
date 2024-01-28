const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "6ce5d418-b426-4274-b45d-c474ee0078b1",
    "Content-Type": "application/json",
  },
};
/**
 * Обертка для fetch с обработкой ошибок
 * @param {string} url Адрес для fetch
 * @param {object} conf Конфигурация для fetch
 */
const apiFetch = async (url, conf) => {
  try {
    const res = await fetch(config.baseUrl + url, {
      headers: config.headers,
      ...conf,
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(`Ошибка: ${res.status}.`);
  }
};

/**
 * Получить текущего пользователя
 */
export const fetchUser = () => apiFetch("/users/me");

export const fetchCards = () => apiFetch("/cards");

/**
 * Обновить профиль на сервере
 * @param {string} name Имя профиле
 * @param {string} about Описание профиля
 */
export const updateUser = (name, about) =>
  apiFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });

/**
 * Создать новую картоку
 * @param {string} name
 * @param {string} link
 */
export const newCard = (name, link) =>
  apiFetch("/cards", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
/**
 * like карточки
 * @param {string} id
 */
export const like = (id) => apiFetch(`/cards/likes/${id}`, { method: "PUT" });

/**
 * убрать like
 * @param {string} id
 */
export const unlike = (id) =>
  apiFetch(`/cards/likes/${id}`, { method: "DELETE" });

/**
 * удаление карточки
 * @param {string} id
 */
export const deleteCard = (id) =>
  apiFetch(`/cards/likes/${id}`, { method: "DELETE" });

/**
 * редактируем аватар
 * @param {string} url
 */
export const changeAvatar = (url) =>
  apiFetch("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: url,
    }),
  });
