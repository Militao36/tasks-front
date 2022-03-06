import { useEffect, useState } from "react"
import { api } from "../../config/api"

export function ModalMembers({ setAddMembers, addMembers }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users')
      .then(({ data }) => setUsers(data))
  }, [])

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Lista de Membros</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ol className="list-group list-group-flush mt-2 mb-3">
              {users.map((user) => {
                return (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-start">
                    {user.username}
                    <i className="fa-solid fa-square-arrow-up-right text-dark" style={{ cursor: 'pointer' }} onClick={() => {
                      setAddMembers([
                        ...addMembers,
                        {
                          id: user.id,
                          username: user.username
                        }
                      ])

                      const filters = users.filter((_user) => _user.id !== user.id)
                      setUsers(filters)
                    }}></i>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  )
}