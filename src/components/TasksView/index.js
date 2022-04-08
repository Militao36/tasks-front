import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import { useUsers } from "../../hooks/useUsers";
import { Card } from "../Card";
import { Comments } from "../Comment";
import { Editor } from "../Editor";
import { Modal } from "../Modal";


export function TasksView({ taskId, reload }) {
  const { projectId } = useParams();

  const [users] = useUsers()

  const [lists, setLists] = useState([])

  const [tasks, setTasks] = useState({
    id: taskId,
    title: "",
    description: "",
    branch: "",
    startDate: "",
    endDate: "",
    deliveryDate: "",
    userId: "",
    listId: "",
    user: {
      id: "",
      username: ""
    },
    timePast: {
      days: 0,
      hours: 0,
      minutes: 0,
    },
    deliveryDateObject: {
      days: 0,
      hours: 0,
      minutes: 0
    },
  });

  useEffect(() => {
    if (taskId) {
      getLists()
      getTask(taskId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])

  const getTask = async (id) => {
    const { data } = await api.get(`/tasks/${id}`)

    const date = DateTime.local()
    const startDate = data.startDate ? DateTime.fromISO(data.startDate) : null
    const endDate = data.endDate ? DateTime.fromISO(data.endDate) : null
    const deliveryDate = data.deliveryDate ? DateTime.fromISO(data.deliveryDate) : null

    // tempo passado
    let timePast = null

    // data prevista
    let dateExpectedDate = null

    if (startDate?.isValid) {
      timePast = endDate?.isValid ?
        endDate.diff(startDate, ['day', 'hour', 'minute']).toObject()
        :
        date.diff(startDate, ['day', 'hour', 'minute']).toObject()
    }

    if (endDate?.isValid) {
      dateExpectedDate = deliveryDate?.isValid ?
        deliveryDate.diff(endDate, ['day', 'hour', 'minute'])?.toObject()
        :
        date.diff(endDate, ['day', 'hour', 'minute']).toObject()
    }


    setTasks({
      id: data.id,
      title: data.title,
      branch: data.branch,
      description: data.description,
      startDate: startDate?.toFormat("yyyy-MM-dd'T'HH:mm") || "",
      endDate: endDate?.toFormat("yyyy-MM-dd'T'HH:mm") || "",
      userId: data.userId,
      deliveryDate: deliveryDate?.toFormat("yyyy-MM-dd'T'HH:mm") || "",
      listId: data.listId,
      timePast: {
        days: timePast?.days || 0,
        hours: timePast?.hours || 0,
        minutes: timePast?.minutes?.toFixed(0) || 0,
      },
      deliveryDateObject: {
        days: dateExpectedDate?.days || 0,
        hours: dateExpectedDate?.hours || 0,
        minutes: dateExpectedDate?.minutes?.toFixed(0) || 0,
      }
    })

  }

  async function getLists() {
    const response = await api.get(`/lists?projectId=${projectId}`)
    const data = response.data || []

    setLists(data)
  }

  function change(key, value) {
    setTasks({
      ...tasks,
      [key]: value
    })
  }

  async function update() {
    await api.put(`/tasks/${tasks.id}`, {
      ...tasks,
      projectId,
      startDate: tasks.startDate?.split("T").join(" ") || null,
      endDate: tasks.endDate?.split("T").join(" ") || null,
      deliveryDate: tasks.deliveryDate?.split("T").join(" ") || null,
    })
    await reload(false)
  }

  return (
    <>
      <Modal title={"Detalhes da tarefa"} ID="task-view" xl={true}>
        <div className="container-fluid">
          <Card>
            <div className="row" style={{ minHeight: '80vh' }}>
              <div className="col-sm-9">
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-6 d-flex align-items-stretch">
                    <div className="card shadow-sm" style={{ flex: 1 }}>
                      <div className="card-body text-center">
                        <h5 className="card-title text-muted">Tempo gasto <i className="fa-solid fa-clock text-primary"></i></h5>
                        <b className="card-text text-center text-muted mb-0">
                          {tasks.timePast.days} dia(s), {tasks.timePast.hours} hora(s), {tasks.timePast.minutes} minuto(s)
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 d-flex align-items-stretch">
                    <div className="card shadow-sm" style={{ flex: 1 }}>
                      <div className="card-body text-center">
                        <h5 className="card-title text-muted">Tempo de Atraso (Entrega) <i className="fa-solid fa-clock text-danger"></i></h5>
                        <b className="card-text text-center text-muted mb-0">
                          {tasks?.deliveryDateObject.days} dia(s), {tasks.deliveryDateObject.hours} hora(s), {tasks.deliveryDateObject.minutes} minuto(s)
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Editor value={tasks.description} />
                  <hr />
                  <Comments id={taskId} type={"task"} />
                </div>
              </div>
              <div className="col-sm-3">
                <div>
                  <h3 className="bg-success text-light p-3 rounded" >
                    <i className="fa-brands fa-buffer me-2"></i>
                    {tasks.title}
                  </h3>
                </div>
                <div className="text-muted mt-3">
                  <p className="text-sm mt-2">Branch
                    <input className="form-control form-control-sm me-2" type="text" value={tasks.branch} onChange={(e) => change("branch", e.target.value)} />
                  </p>

                  <p className="text-sm mt-2">Inicio
                    <input className="form-control form-control-sm me-2" type="datetime-local" value={tasks.startDate} onChange={(e) => change('startDate', e.target.value)} />
                  </p>
                  <p className="text-sm mt-2">Fim
                    <input className="form-control form-control-sm me-2" type="datetime-local" value={tasks.endDate} onChange={(e) => change('endDate', e.target.value)} />
                  </p>

                  <p className="text-sm mt-2">Data de Entrega
                    <input className="form-control form-control-sm me-2" type="datetime-local" value={tasks.deliveryDate} onChange={(e) => change('deliveryDate', e.target.value)} />
                  </p>

                  <p className="text-sm mt-2">Usuário:
                    <select className="form-select form-select-sm" onChange={(e) => change('userId', e.target.value)} value={tasks.userId}>
                      {users.map((user) => {
                        return (
                          <option key={user.id} value={user.id}>{user.username}</option>
                        )
                      })}
                    </select>
                  </p>
                  <p className="text-sm mt-2">Listas:
                    <select className="form-select form-select-sm" onChange={(e) => change('listId', e.target.value)} value={tasks.listId}>
                      {lists.map((list) => {
                        return (
                          <option key={list.id} value={list.id}>{list.title}</option>
                        )
                      })}
                    </select>
                  </p>
                </div>
                <div className="mt-3 mb-3">
                  <button className="btn btn-sm btn-success" style={{ marginRight: 5, float: 'right' }} onClick={update}>Salvar Alterações</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  )
}