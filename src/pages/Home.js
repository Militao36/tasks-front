import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Project } from '../components/Project'
import { Task } from '../components/Task'
import { api } from "../config/api";

export function Home() {
  const [tasksInProgress, setTasksInProgress] = useState([])
  const statusTasks = 'in-progress'

  useEffect(() => {
    api.get(`/tasks/${statusTasks}`)
      .then(({ data }) => {
        setTasksInProgress(data)
      })
  }, [])

  return (
    <>
      <Menu />
      <div className="container-fluid mt-2 row" >
        <div className='col-sm-10 col-md-8'>
          {/* <div className="row d-flex justify-content-evenly">
            <div className="card text-white bg-success col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
              <div className="card-body d-flex">
                <p className="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
                  <i className="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
                </p>
                <div>
                  <p className="card-text">
                    100
                  </p>
                  <p>Tarefas finalizadas</p>
                </div>
              </div>
            </div>
            <div className="card text-white bg-danger col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
              <div className="card-body d-flex">
                <p className="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
                  <i className="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
                </p>
                <div>
                  <p className="card-text">
                    100
                  </p>
                  <p>Tarefas atrasadas</p>
                </div>
              </div>
            </div>
            <div className="card text-white bg-warning col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
              <div className="card-body d-flex">
                <p className="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
                  <i className="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
                </p>
                <div>
                  <p className="card-text">
                    100
                  </p>
                  <p>Tarefas em espera</p>
                </div>
              </div>
            </div>
          </div> */}

          <Project />
        </div>
        <div className="col-sm-2 col-md-4">
          <h5 className="card-title text-start">Tarefas em andamento</h5>
          {tasksInProgress.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.title}
                username={task.user.username}
                time={`Inicio: ${task.start_date}`}
                prefix={String(task.id).substring(0, 5)}
              />
            )
          })}

        </div>
      </div>
    </>
  );
}