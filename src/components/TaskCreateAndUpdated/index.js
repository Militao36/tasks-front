import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../config/api'
import { useUsers } from '../../hooks/useUsers'
import { Editor } from '../Editor'
import { Modal } from '../Modal'


export function TaskCreateAndUpdated({ projectId, listId, idTask, reload = () => { } }) {
  const navigation = useNavigate()
  const [users] = useUsers()

  const [task, setTask] = useState({
    id: "",
    title: "",
    branch: "",
    userId: "",
    deliveryDate: "",
    description: "",
    projectId: projectId,
    listId: listId
  })

  useEffect(() => {
    if (idTask) {
      getTask(idTask)
    } else {
      setTask({
        id: "",
        title: "",
        branch: "",
        userId: "",
        deliveryDate: "",
        description: "",
        projectId: "",
        listId: ""
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTask, projectId, listId])


  async function save() {
    try {
      if (!projectId || !listId) {
        return alert("A tarefa deve ser adicionada a um lista.")
      }

      await api.post(`/tasks`, {
        ...task,
        projectId: projectId,
        listId: listId
      })
    } catch (error) {
      if (error.response.status === 403) {
        alert("Você não tem permissão para acessar esse board, iremos te direcionar para a página inicial")
        navigation('/home')
      }
    }

  }

  async function update() {
    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        projectId: projectId,
        listId: listId
      })
    } catch (error) {
      if (error.response.status === 403) {
        alert("Você não tem permissão para acessar esse board, iremos te direcionar para a página inicial")
        navigation('/home')
      }
    }
  }

  async function handle() {
    if (!task?.id) {
      await save()
    } else {
      await update()
    }
    await reload()
  }

  async function getTask(id) {
    try {
      const { data } = await api.get(`/tasks/${id}`)

      setTask({
        ...data,
        deliveryDate: data.deliveryDate || ''
      })
    } catch (error) {
      if (error.response.status === 403) {
        alert("Você não tem permissão para acessar esse board, iremos te direcionar para a página inicial")
        navigation('/home')
      }
    }
  }

  return (
    <Modal title={"Cadastro de tarefas"} ID={"create-task-of-modal"}>
      <div className="card mt-2 mb-4 container-fluid">
        <div className="card-body">
          <div className="row">
            <div className='col-sm-3'>
              <label htmlFor="">Nome</label>
              <input
                className="form-control form-control-sm"
                type="text"
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                value={task.title}
              />
            </div>
            <div className='col-sm-3'>
              <label htmlFor="">Branch</label>
              <input
                className="form-control form-control-sm"
                type="text"
                value={task.branch}
                onChange={(e) => setTask({ ...task, branch: e.target.value })}
              />
            </div>
            <div className="col-sm-3">
              <label htmlFor="">Membro</label>
              <div className="input-group">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  value={task.userId}
                  onChange={(e) => setTask({ ...task, userId: e.target.value })}
                >
                  <option value={null}>Selecione</option>
                  {users.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>{user.username}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className='col-sm-3'>
              <label htmlFor="">Data de Entrega</label>
              <input
                className="form-control form-control-sm"
                type="date"
                value={task.deliveryDate}
                onChange={(e) => setTask({ ...task, deliveryDate: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className='col-sm-12 mt-3'>
              <label className=''>Descrição</label>
              <Editor
                view={false}
                value={task.description}
                setValue={(e) => setTask({ ...task, description: e })}
              />
            </div>
          </div>
          <div className='col-sm-12 d-flex justify-content-end mt-3'>
            <button className='btn btn-sm btn-success' onClick={() => handle()}>Salvar informações</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}