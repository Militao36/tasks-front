import { useContext, useState } from 'react'
import ContextUser from '../../context/ContextUsers'
import { Editor } from '../Editor'
import { Modal } from '../Modal'

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

  function addUser(member) {
    setProject({
      ...project,
      users: [
        ...project.users,
        member
      ]
    })
    console.log(project)
  }


  return (
    <>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal">Abrir</button>
      <Modal title={"Criar novo projeto"}>
        <div className='row container-fluid'>
          <div className='col-sm-8'>
            <label htmlFor="">Nome do Projeto</label>
            <input className="form-control form-control-sm" type="text" />
          </div>
          <div className='col-sm-4'>
            <label htmlFor="">Data de Entrega</label>
            <input className="form-control form-control-sm" type="date" />
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

            <div className="col-sm-12">
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
        </div>
      </Modal>
    </>

  )
}