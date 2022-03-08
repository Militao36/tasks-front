import { useContext, useEffect, useState } from 'react'
import ContextUser from '../../context/ContextUsers'
import { Editor } from '../Editor'
import { Card } from '../Card'
import { Menu } from '../Menu'
import ProjectService from '../../services/ProjectService'
import { useParams } from 'react-router-dom'

export function ProjectCreateAndUpdated() {
  const { id } = useParams();

  const { users } = useContext(ContextUser)

  const [userSelect, setUserSelect] = useState('')

  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    users: [],
    deliveryDate: "",
    expectedDate: "",
    status: ""
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

  async function create() {
    if (!id) {
      await ProjectService.create(project)
    } else {
      await ProjectService.update(id, project)
    }
  }

  async function findById() {
    const data = await ProjectService.findById(id)
    setProject({
      id: id,
      title: data.title,
      description: data.description,
      deliveryDate: data.deliveryDate ? String(data.deliveryDate).substring(0, 10) : "",
      expectedDate: String(data.expectedDate).substring(0, 10),
      status: data.status,
      users: data.users
    })
  }

  useEffect(() => {
    findById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
              <input
                className="form-control form-control-sm"
                type="text"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Data de Entrega</label>
              <input
                className="form-control form-control-sm"
                type="date"
                value={project.deliveryDate}
                onChange={(e) => setProject({ ...project, deliveryDate: e.target.value })}
              />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Data Prevista de Entrega</label>
              <input
                className="form-control form-control-sm"
                type="date"
                value={project.expectedDate}
                onChange={(e) => setProject({ ...project, expectedDate: e.target.value })}
              />
            </div>
            <div className='col-sm-2'>
              <label htmlFor="">Status</label>
              <input
                className="form-control form-control-sm"
                type="text"
                value={project.status || "Rascunho"}
                disabled
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
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.users.map((value) => {
                      return (
                        <tr key={value.id}>
                          <td>{value.username}</td>
                          <td>
                            <button className='btn btn-sm btn-danger'>
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
              <button className='btn btn-sm btn-dark' onClick={create}>Salvar informações</button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}