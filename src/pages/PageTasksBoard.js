import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateList } from '../components/CreateList';
import { Menu } from '../components/Menu';
import { TaskCard } from '../components/TaskCard';
import { TaskCreateAndUpdated } from '../components/TaskCreateAndUpdated';
import { api } from '../config/api';


export function PageTasksBoard() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([])
  const [tasksFinalizadas, setTasksFinalizadas] = useState([])
  const [tasksBackLog, setTasksBackLog] = useState([])

  const [idTaskMove, setIdTaskMove] = useState("")

  useEffect(() => {
    api.get(`/lists?projectId=${projectId}`)
      .then(async ({ data = [] }) => {

        const getTasks = await api.get(`/tasks?projectId=${projectId}`)

        const backlog = getTasks.data.filter((value) => value.user == null || value.listId === null)
        setTasksBackLog(backlog)

        const finalizadas = getTasks.data.filter((value) => value.startDate !== null && value.endDate !== null)
        setTasksFinalizadas(finalizadas)

        const lists = data.map((value) => {
          value.tasks = getTasks.data.filter((task) => task.listId === value.id)
          return value
        })

        setTasks(lists)
      })
  }, [projectId])


  function move(type, listId) {
    console.log(type, idTaskMove, listId)
  }

  function createTask() {
    const modal = new window.bootstrap.Modal(document.getElementById('create-task-of-modal'))
    modal.show()
  }

  return (
    <>
      <Menu />
      <div className="container-fluid" style={{ backgroundColor: '#f4f6f9', }}>
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <h3>Tasks Board</h3>
          </div>
          <div className="d-none d-sm-block mt-2">
            <button type="button" className="btn btn-sm btn-dark" onClick={() => createTask()}>
              <i className="fa-solid fa-plus me-2"></i>
              New Task
            </button>

            <button className="btn btn-sm btn-dark"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              style={{ marginLeft: 20 }}>
              <i className="fa-solid fa-plus me-2"></i>
              New List
            </button>
          </div>
        </div>

        <div className='board d-flex overflow-auto mb-1' style={{ width: '99%', height: '100vh', marginLeft: 10, marginRight: 10 }}>
          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }}>
            <div className="card-header bg-primary text-white align-middle" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-list-check me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => move("Backlog", "")}>
              </i>
              Backlog
            </div>
            <div className="card-body overflow-auto mb-2 mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksBackLog.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    task={
                      {
                        ...task,
                        border: "5px solid #0d6efd",
                        setIdTaskMove: setIdTaskMove,
                      }
                    }
                  />
                )
              })}
            </div>
          </div>

          {tasks.map((value) => {
            return (
              <div key={value.id} className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
                <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
                  {(idTaskMove) && <i
                    onClick={() => move(value.title, value.id)}
                    className="fa-solid fa-arrow-down-short-wide me-2"
                    style={{ color: 'yellow', cursor: 'pointer' }}>
                  </i>}
                  {value.title}
                </div>
                <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
                  {value.tasks.map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        task={
                          {
                            ...task,
                            border: "5px solid #343a40",
                            setIdTaskMove: setIdTaskMove,
                          }
                        }
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
            <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-check me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => move("Entregue", "")}>
              </i>
              Entregue
            </div>
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksFinalizadas.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    task={
                      {
                        ...task,
                        border: "5px solid #198754",
                        setIdTaskMove: setIdTaskMove,
                      }
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div >
      <CreateList projectId={projectId} />
      <TaskCreateAndUpdated projectId={projectId} />
    </>
  );
}

