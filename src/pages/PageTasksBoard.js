import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateList } from '../components/CreateList';
import { Menu } from '../components/Menu';
import { TaskCard } from '../components/TaskCard';
import { TaskCreateAndUpdated } from '../components/TaskCreateAndUpdated';
import { TasksView } from '../components/TasksView';
import { api } from '../config/api';


export function PageTasksBoard() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([])

  const [taskId, setTaskId] = useState("")

  const [idTaskMove, setIdTaskMove] = useState("")

  useEffect(() => {
    listTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  function listTasks() {
    api.get(`/lists?projectId=${projectId}`)
      .then(async ({ data = [] }) => {
        const getTasks = await api.get(`/tasks?projectId=${projectId}`)

        const lists = data.map((value) => {
          value.tasks = getTasks.data.filter((task) => task.listId === value.id)
          return value
        })

        setTasks(lists)
      })
  }


  async function move(type, listId) {
    await api.post('/tasks/task/move', { type, listId, taskId: idTaskMove })
    listTasks()
  }

  function createTask() {
    const modal = new window.bootstrap.Modal(document.getElementById('create-task-of-modal'))
    modal.show()
  }

  function viewTask(idTask) {
    setTaskId(idTask)
    const modal = new window.bootstrap.Modal(document.getElementById('task-view'))
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
            <button className="btn btn-sm btn-success"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              style={{ marginLeft: 20 }}>
              <i className="fa-solid fa-plus me-2"></i>
              New List
            </button>
          </div>
        </div>

        <div className='board d-flex overflow-auto mb-1' style={{ width: '99%', height: '100vh', marginLeft: 10, marginRight: 10 }}>
          {tasks.map((value) => {
            return (
              <div key={value.id} className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center" style={{ borderRadius: '5px 5px 0 0' }}>
                  {
                    (idTaskMove && value.tasks.filter(v => v.id === idTaskMove).length === 0)
                    &&
                    <i className="fa-solid fa-caret-down" style={{ cursor: 'pointer' }} onClick={() => move(value.title, value.id)}></i>
                  }
                  <p>{value.title}</p>
                  <i className="fa-solid fa-square-plus me-2" style={{ cursor: 'pointer' }} onClick={() => createTask()}></i>
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
                            click: () => viewTask(task.id)
                          }
                        }
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div >
      <CreateList projectId={projectId} />
      <TaskCreateAndUpdated projectId={projectId} />
      <TasksView taskId={taskId} />
    </>
  );
}

