import { useState } from "react";
import { Card } from "../Card";
import { Comments } from "../Comment";
import { Editor } from "../Editor";
import { Modal } from "../Modal";


export function TasksView({ taskId }) {
  const [tasks, setTasks] = useState({
    id: taskId,
    title: ""
  });
  
  
  return (
    <>
      <Modal title={"Detalhes da tarefa"} ID="task-view">
        <div className="container-fluid">
          <Card>
            <div className="row" style={{ minHeight: '80vh' }}>
              <div className="col-sm-9">
                <div className="row">
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
                  <Editor />
                  <hr />
                  <Comments />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="">
                  <h3 className="bg-success text-light p-3 rounded" ><i className="fa-brands fa-buffer"></i>
                    #Nome tarefa
                  </h3>
                </div>
                <div className="text-muted mt-3">
                  <p className="text-sm mt-2">Status
                    <b className="d-block"></b>
                  </p>

                  <p className="text-sm mt-2">Inicio
                    <b className="d-block"></b>
                  </p>
                  <p className="text-sm mt-2">Fim
                    <b className="d-block"></b>
                  </p>

                  <p className="text-sm mt-2">Data de Entrega
                    <b className="d-block"></b>
                  </p>

                  <p className="text-sm mt-2">Data Prevista de Entrega
                    <b className="d-block"></b>
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