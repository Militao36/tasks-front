import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../config/api'
import ContextUsers from '../../context/ContextUsers'
import { Editor } from '../Editor'
import { Modal } from '../Modal'


export function TaskCreateAndUpdated({ projectId, listId, setProps, listProps, idTask }) {
  const { users } = useContext(ContextUsers)

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
    getTask(idTask)
  }, [idTask])

  const notificationError = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
  async function save() {
    try {
      if (task.id === "") {
        await api.post(`/tasks`, {
          ...task,
          projectId: projectId,
          listId: listId
        })
        setTask({
          id: "",
          title: "",
          branch: "",
          userId: "",
          deliveryDate: "",
          description: "",
          projectId: projectId,
          listId: listId
        })
        return setProps(!listProps)
      }
      else{
        await api.put(`/tasks/${task.id}`, {
          ...task,
          projectId: projectId,
          listId: listId
        })
        setTask({
          id: "",
          title: "",
          branch: "",
          userId: "",
          deliveryDate: "",
          description: "",
          projectId: projectId,
          listId: listId
        })
        return setProps(!listProps)
      }
    } catch (error) {
      notificationError("Não foi possível atualizar/criar, tente novamente")
    }

  }

  async function getTask(id) {
    const { data } = await api.get(`/tasks/${id}`)
    setTask(data)
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
                  defaultValue={null} aria-label=".form-select-sm example"
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
              <label htmlFor="">Previsão de Entrega</label>
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
            <button className='btn btn-sm btn-success' onClick={() => save()}>Salvar informações</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}