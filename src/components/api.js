const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "6ce5d418-b426-4274-b45d-c474ee0078b1",
    "Content-Type": "application/json",
  },
};

export const fetchUser = async () => {
  const res = await fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  });
  return await res.json();
};

export const fetchCards = async () => {
  const res = await fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  });
  return await res.json();
};
export const updateUser = async (name, about) => {
  const res = await fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
  return await res.json();
};
export const newCard = async (name, link) => {
  //console.log('!!!!!!!',card.name, card.link);
  const res = await fetch(config.baseUrl + "/cards", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
    headers: config.headers,
  });
  return await res.json();
};

export const like = async (id) => {
  const res = await fetch(config.baseUrl + `/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
  return await res.json();
};

export const unlike = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return await res.json();
};
export const deleteCard = async (id) => { 
    const res = await fetch (`${config.baseUrl}/cards/likes/${id}`, {
        method:"DELETE",
        headers: config.headers,
    });
    return await res.json();
}
export const changeAvatar = async (url) => {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
        method:"PATCH",
        body: JSON.stringify({
            avatar: url,
          }),
          headers:config.headers,
    });
    return await res.json();
}