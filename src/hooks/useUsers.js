import { useEffect, useState } from "react"
import { api } from "../config/api"

function useUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users')
      .then(({ data }) => setUsers(data))
  }, [])


  return [users]
}

export { useUsers }