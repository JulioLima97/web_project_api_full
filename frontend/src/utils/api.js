class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(res => {
          if (res.ok) {
             res.json().then(data => data);
          }
          return Promise.reject(`Error: ${res.status}`);
      });
  }
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then((res) => {
          if (res.ok) {
           res.json().then(data => data);
          }
          return Promise.reject(`Error: ${res.status}`);
      });
  }
  editUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about,
          }),
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
  }
  addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link
          })
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  
  addLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  removeLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked ) {
    if (isLiked) {
      return this.removeLikes(cardId);
    }
    return this.addLikes(cardId);
  }
  
  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const token = localStorage.getItem('token');

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;