class Api {
  constructor({ baseUrl, headers} ) {
    this._baseUrl = baseUrl
    this._headers = headers;
  }

  getAppInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  _handleServerResponse(res){
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }) .then((res) => this._handleServerResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    }) .then((res) => this._handleServerResponse(res));
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
    .then((res) => this._handleServerResponse(res));
  }
}   

export default Api;