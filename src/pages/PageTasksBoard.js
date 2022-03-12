import { useEffect, useState } from 'react';
import { CreateList } from '../components/CreateList';

import { Menu } from '../components/Menu'
import { Modal } from '../components/Modal';
import { TaskCard } from '../components/TaskCard';
import { api } from '../config/api'

export function PageTasksBoard() {
  const [tasks, setTasks] = useState([])
  const [tasksFinalizadas, setTasksFinalizadas] = useState([])
  const [tasksBackLog, setTasksBackLog] = useState([])

  useEffect(() => {
    api.get(`/tasks?projectId=${'f0d822bb-d491-4d62-a762-7f6bea17a21c'}`)
      .then(({ data = [] }) => {
        const lists = data.map((value) => {
          if (value?.list === null) {
            return null
          }

          return {
            id: value.list.id,
            title: value.list.title,
          }
        }).filter((v) => v !== null).reduce((prev, current) => {
          if (prev.filter(v => v.id === current.id).length === 0) {
            prev.push(current)
            return prev
          }

          return prev
        }, [])

        const backlog = data.filter((value) => value.user == null)
        setTasksBackLog(backlog)

        const finalizadas = data.filter((value) => value.startDate !== null && value.endDate !== null)
        setTasksFinalizadas(finalizadas)

        const body = lists.map(({ id, title }) => {
          return {
            id,
            title,
            tasks: data.filter((v) => (v?.list?.id === id) && v.endDate === null)
          }
        })
        setTasks(body)
      })
  }, [])

  return (
    <>
      <Menu />
      <div className="container-fluid" style={{ backgroundColor: '#f4f6f9', }}>
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <h3>Tasks Board</h3>
          </div>
          <div className="d-none d-sm-block mt-2">
            <button type="button" className="btn btn-sm btn-dark">
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
              <i className="fa-solid fa-list-check me-2"></i>
              Backlog
            </div>
            <div className="card-body overflow-auto mb-2 mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksBackLog.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    username={task.user?.username}
                    title={task.title}
                    startDate={task.startDate}
                    border={"5px solid #0d6efd"}
                    labels={[
                      {
                        name: 'Iniciado',
                        color: 'bg-primary'
                      },
                    ]}
                  />
                )
              })}
            </div>
          </div>

          {tasks.map((value) => {
            return (
              <div key={value.id} className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
                <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
                  {value.title}
                </div>
                <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
                  {value.tasks.map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        username={task.user.username}
                        title={task.title}
                        startDate={task.startDate}
                        border={"5px solid #343a40"}
                        labels={[
                          {
                            name: 'Iniciado',
                            color: 'bg-primary'
                          },
                        ]}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
            <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-check me-2"></i>
              Entregue
            </div>
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksFinalizadas.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    username={task.user.username}
                    startDate={task.startDate}
                    endDate={task.endDate}
                    title={task.title}
                    border={"5px solid #198754"}
                    labels={[
                      {
                        name: 'Iniciado',
                        color: 'bg-primary'
                      },
                    ]}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div >
      <CreateList />
    </>
  );
}

