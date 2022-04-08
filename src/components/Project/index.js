import { useState } from 'react'

import { useUsers } from '../../hooks/useUsers'
import { useProject } from '../../hooks/useProject'

import { Editor } from '../Editor'
import { Card } from '../Card'

export function ProjectCreateAndUpdated({ id, reload }) {
  const [users] = useUsers()
  const [setProject, project, addUser, createOrUpdated, removeUserOfProject] = useProject(id)

  const [userSelect, setUserSelect] = useState('')


  return (
    <Card>
      <div className="row">
        <div className='col-sm-6'>
          <label htmlFor="">Nome do Projeto</label>
          <input
            className="form-control form-control-sm"
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </div>
        <div className='col-sm-12 mt-3'>
          <h6>Descrição</h6>
          <Editor
            view={false}
            value={project.description}
            setValue={(e) => setProject({ ...project, description: e })}
          />
        </div>
        <div className='mt-3 row'>
          <div className="col-sm-4">
            <label htmlFor="">Membros</label>
            <div className="input-group">
              <select className="form-select form-select-sm" defaultValue={null} onChange={(e) => setUserSelect(e.target.value)} aria-label=".form-select-sm example">
                <option value={null}>Selecione</option>
                {users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  )
                })}
              </select>
              <button className="btn btn-sm btn-success" type="button" onClick={() => addUser(users.filter((value) => value.id === userSelect))}>Adicionar</button>
            </div>
          </div>

          <div className="col-sm-8">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">Usuário</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {project.users.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td>{value.username}</td>
                      <td>
                        <button className='btn btn-sm btn-danger' onClick={async () => {
                          await removeUserOfProject(value.id)
                          reload()
                        }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-sm-12 d-flex justify-content-end'>
          <button className='btn btn-sm btn-dark' onClick={async () => {
            await createOrUpdated()
            reload()
          }}>Salvar informações</button>
        </div>
      </div>
    </Card>
  )
}