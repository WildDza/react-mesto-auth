class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileInformation() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(this._getResponseData);
  }

  // другие методы работы с API
  editProfileInformation(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  addPost(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }

  deletePost(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // deleteLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then(this._getResponseData);
  // }

  // addLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then(this._getResponseData);
  // }

  changeLikePostStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "4d08c1b9-14a0-48e8-89c5-c346c0ddc652",
    "Content-Type": "application/json",
  },
});

export default api;
