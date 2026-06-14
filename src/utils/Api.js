export default class Api {
  constructor({ baseUrl, headers} ) {
    this._baseurl = ba
    this._headers = headers;
  }

  _handleServerResponse(res){
    if (res.ok) {
        return res => res.json
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    
  }

  // other methods for working with the API
}   