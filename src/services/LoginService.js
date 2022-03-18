import { api } from "../config/api"
class Login {
  async login(dataLogin) {
    const { data } = await api.post('/auth',dataLogin)
    return data
  }
}

export default new Login()