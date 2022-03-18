import { useState, useEffect } from "react";
import { Card } from "../Card";
import { Comments } from "../Comment";
import { Editor } from "../Editor";
import { Modal } from "../Modal";
import { api } from "../../config/api"


export function TasksView({ taskId }) {
  const [tasks, setTasks] = useState({
    id: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    getTask(taskId)
  },[taskId])

  const getTask = async (id) =>{
    try {
      const {data} = await api.get(`/tasks/${id}`)
      setTasks(data)
    } catch (error) {
      
    }
  }

  return (
    <>
      <Modal title={"Detalhes da tarefa"} ID="task-view">
        <div className="container-fluid">
          <Card>
            <div className="row" style={{ minHeight: '80vh' }}>
              <div className="col-sm-9">
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-4 d-flex align-items-stretch">
                    <div className="card shadow-sm" style={{ flex: 1 }}>
                      <div className="card-body text-center">
                        <h5 className="card-title text-muted">Tempo gasto <i className="fa-solid fa-clock text-primary"></i></h5>
                        <b className="card-text text-center text-muted mb-0">
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 d-flex align-items-stretch">
                    <div className="card shadow-sm" style={{ flex: 1 }}>
                      <div className="card-body text-center">
                        <h5 className="card-title text-muted">Tempo de Atraso (Entrega) <i className="fa-solid fa-clock text-danger"></i></h5>
                        <b className="card-text text-center text-muted mb-0">
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
                  <Comments />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="">
                  <h3 className="bg-success text-light p-3 rounded" ><i className="fa-brands fa-buffer"></i>
                   {tasks.title}
                  </h3>
                </div>
                <div className="text-muted mt-3">
                  <p className="text-sm mt-2">branch
                    <b className="d-block">{tasks.branch}</b>
                  </p>

                  <p className="text-sm mt-2">Inicio
                  <b className="d-block">{tasks.startDate}</b>
                </p>
                <p className="text-sm mt-2">Fim
                  <b className="d-block">{tasks.endDate}</b>
                </p>

                <p className="text-sm mt-2">Data de Entrega
                  <b className="d-block">{tasks.deliveryDate}</b>
                </p>

                <p className="text-sm mt-2">Data Prevista de Entrega
                  <b className="d-block">{tasks.expectedDate}</b>
                </p>
                  <p className="text-sm mt-2">Membro
                    <b className="d-block"></b>
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