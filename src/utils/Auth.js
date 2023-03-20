class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json;
    }
    return Promise.reject(`${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(this._checkResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default auth;
