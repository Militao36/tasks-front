import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { CreateList } from '../components/CreateList';
import { Menu } from '../components/Menu';
import { TablesBoard } from '../components/TableBoard';
import { TaskCreateAndUpdated } from '../components/TaskCreateAndUpdated';
import { TasksView } from '../components/TasksView';
import { api } from '../config/api';


export function PageTasksBoard() {
  const navigation = useNavigate()

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([])

  const [listId, setListId] = useState("")

  const [taskId, setTaskId] = useState("")


  useEffect(() => {
    listTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  async function listTasks() {
    try {
      const response = await api.get(`/lists?projectId=${projectId}`)
      const data = response.data || []

      const getTasks = await api.get(`/tasks?projectId=${projectId}`)

      const lists = data.map((value) => {
        value.tasks = getTasks.data.filter((task) => task.listId === value.id)
        return value
      })

      setTasks(lists)
    } catch (error) {
      if (error.response.status === 403) {
        alert("Você não tem permissão para acessar esse board, iremos te direcionar para a página inicial")
        navigation('/home')
      }
    }

  }

  function createTask(id_task, list_id) {
    setTaskId(state => state = id_task)
    setListId(state => state = list_id)

    const modal = new window.bootstrap.Modal(document.getElementById('create-task-of-modal'))
    modal.show()
  }

  function viewTask(id) {
    setTaskId(id)
    const modal = new window.bootstrap.Modal(document.getElementById('task-view'))
    modal.show()
  }

  function createList(list_id) {
    setListId(state => state = list_id)
    const modal = new window.bootstrap.Modal(document.getElementById('create-list-of-modal'))
    modal.show()
  }

  async function reload(limparTaskIdAndListId = false) {
    await listTasks()

    if (limparTaskIdAndListId === true) {
      setTaskId("")
      setListId("")
    }

  }

  return (
    <>
      <Menu />
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <h3>Tasks Board</h3>
          </div>
          <div className="d-none d-sm-block mt-2">
            <button className="btn btn-sm btn-success"
              onClick={() => createList("")} style={{ marginLeft: 20 }}>
              <i className="fa-solid fa-plus me-2"></i>
              New List
            </button>
          </div>
        </div>

        <div className='container'>
          <div className='col-sm-12'>
            {tasks.map((value) => {
              return (
                <div key={value.id}>
                  <div className="bg-success text-white rounded d-flex justify-content-between" style={{ height: 40 }}>
                    <h5 style={{ paddingTop: 5 }}><i className="fa-solid fa-chevron-right" style={{ padding: 5 }}></i>   {value.title}</h5>
                    <div style={{ padding: 5 }}>
                      <button className="btn btn-sm btn-dark me-1"
                        onClick={() => createList(value.id)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="btn btn-sm btn-dark"
                        onClick={() => createTask("", value.id)}>
                        <i className="fa-solid fa-square-plus" style={{ cursor: 'pointer' }}></i>
                      </button>
                    </div>
                  </div>
                  <Card key={value.id}>
                    <TablesBoard
                      listName={""}
                      tasks={value.tasks}
                      viewTask={viewTask}
                      createTask={createTask}
                    />
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div >
      <CreateList projectId={projectId} idList={listId} reload={reload} />
      <TasksView taskId={taskId} reload={reload} />
      <TaskCreateAndUpdated projectId={projectId} listId={listId} idTask={taskId} reload={reload} />
    </>
  );
}

