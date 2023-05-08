const TOKEN = 'managerToken'
export class Token {
  static get () {
    return localStorage.getItem(TOKEN)
  }

  static set (token) {
    localStorage.setItem(TOKEN, token)
  }

  static remove () {
    localStorage.removeItem(TOKEN)
  }
}
