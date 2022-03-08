import { useContext, useState } from 'react'
import ContextUser from '../../context/ContextUsers'
import { Editor } from '../Editor'
import { Card } from '../Card'
import { Menu } from '../Menu'

export function ProjectCreate() {
  const { users } = useContext(ContextUser)

  const [value, setValue] = useState("")
  const [userSelect, setUserSelect] = useState('')

  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    endDate: null,
    startDate: null,
    status: '',
    users: [],
    deliveryDate: ""
  })

  function addUser(member = []) {
    if (member.length === 0) {
      return;
    }

    const userExists = project.users.filter((user) => user.id === member[0].id)

    if (userExists.length === 0) {
      setProject({
        ...project,
        users: [
          ...project.users,
          member[0]
        ]
      })
    }
  }


  return (
    <>
      <Menu />
      <div className='container-fluid'>
        <div className="d-flex justify-content-between mt-3">
          <h3>Cadastro de projeto</h3>
          <nav aria-label="breadcrumb ">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Projeto</li>
            </ol>
          </nav>
        </div>
        <Card>
          <div className="row">
            <div className='col-sm-6'>
              <label htmlFor="">Nome do Projeto</label>
              <input className="form-control form-control-sm" type="text" />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Data de Entrega</label>
              <input className="form-control form-control-sm" type="date" />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Data Prevista de Entrega</label>
              <input className="form-control form-control-sm" type="date" />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Status</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
            <div className='col-sm-12 mt-3'>
              <h6>Descrição</h6>
              <Editor view={false} value={value} setValue={setValue} />
            </div>
            <div className='mt-3 row'>
              <div className="col-sm-5">
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

              <div className="col-sm-7">
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.users.map((value) => {
                      return (
                        <tr key={value.id}>
                          <td>{value.username}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-sm-12 d-flex justify-content-end'>
              <button className='btn btn-sm btn-dark'>Salvar informações</button>
            </div>
          </div>
        </Card>
      </div>

    </>

  )
}