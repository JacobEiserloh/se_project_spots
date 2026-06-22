class Api {
  constructor({ baseUrl, headers} ) {
    this._baseUrl = baseUrl
    this._headers = headers;
  }

  _handleServerResponse(res){
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
    }) .then((res) => this._handleServerResponse(res))
  }

  addCard({name, link}){
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
        })
    }) .then((res) => this._handleServerResponse(res));
  }

  removeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => this._handleServerResponse(res))
  }
}   

export default Api;