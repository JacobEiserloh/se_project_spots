export default class Api {
  constructor({ baseUrl, headers} ) {
    this._baseUrl = baseUrl
    this._headers = headers;
  }

  _handleServerResponse(res){
    if (res.ok) {
        return res => res.json
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${baseUrl}/cards`, {
        headers: this._headers,
    }) .then(this._handleServerResponse())
  }

  addCard({title, url}){
    return fetch(`${this._baseUrl}/cards`, {
        method: "post",
        headers: this._headers,
        body: JSON.stringify({
            title,
            url
        })
    }) .then(this._handleServerResponse);
  }
}   