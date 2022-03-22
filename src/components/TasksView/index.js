import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { Card } from "../Card";
import { Comments } from "../Comment";
import { Editor } from "../Editor";
import { Modal } from "../Modal";


export function TasksView({ taskId, listProps }) {
  const [tasks, setTasks] = useState({
    id: "",
    title: "",
    description: "",
    branch: "",
    startDate: "",
    endDate: "",
    deliveryDate: "",
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
      getTask(taskId)
    }
  }, [taskId])
  useEffect(() => {
      getTask(taskId)
  }, [listProps])

  const getTask = async (id) => {
    try {
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
        ...data,
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
    } catch (error) { }
  }

  return (
    <>
      <Modal title={"Detalhes da tarefa"} ID="task-view">
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
                  <h2>{tasks.description}</h2>
                </div>
                <div className="mt-4">
                  <Editor />
                  <hr />
                  <Comments id={taskId} type={"task"} />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="">
                  <h3 className="bg-success text-light p-3 rounded" >
                    <i className="fa-brands fa-buffer me-2"></i>
                    {tasks.title}
                  </h3>
                </div>
                <div className="text-muted mt-3">
                  <p className="text-sm mt-2">Branch
                    <b className="d-block">{tasks.branch || "Principal"}</b>
                  </p>

                  <p className="text-sm mt-2">Inicio
                    <b className="d-block">{tasks.startDate || "Aguardando"}</b>
                  </p>
                  <p className="text-sm mt-2">Fim
                    <b className="d-block">{tasks.endDate || "Aguardando"}</b>
                  </p>

                  <p className="text-sm mt-2">Data de Entrega
                    <b className="d-block">{tasks.deliveryDate || "Sem data de entrega"}</b>
                  </p>

                  <p className="text-sm mt-2">Membro
                    <b className="d-block">{tasks.user.username}</b>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  )
}