import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { Menu } from '../components/Menu'
import { TaskCard } from '../components/TaskCard';
import { api } from '../config/api'

export function PageTasksBoard() {
  const [tasks, setTasks] = useState([])
  const [tasksFinalizadas, setTasksFinalizadas] = useState([])

  useEffect(() => {
    api.get(`/tasks?projectId=${'0da45f33-f75e-4a7b-a14f-28fb123c91c9'}`)
      .then(({ data = [] }) => {
        const users = data.map(value => {
          return {
            id: value.user.id,
            username: value.user.username,
            tasks: []
          }
        })

        const body = users.map((value) => {
          return {
            ...value,
            tasks: data.filter((v) => {
              return (v.user.id === value.id) && v.endDate === null
            })
          }
        })

        const finalizadas = data.filter((value) => value.endDate !== null)
        setTasksFinalizadas(finalizadas)
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
          <div className="d-none d-sm-block mt-2 ">
            <ol className="breadcrumb d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-outline-dark me-2">
                <i className="fa-solid fa-plus me-2"></i>
                New Task
              </button>
            </ol>
          </div>
        </div>

        <div className='board d-flex overflow-auto mb-1' style={{ width: '99%', height: '100vh', marginLeft: 10, marginRight: 10 }}>
          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }}>
            <div className="card-header bg-primary text-white align-middle" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-list-check me-2"></i>
              Backlog
            </div>
            <div className="card-body overflow-auto mb-2 mb-2" style={{ backgroundColor: '#f0f0f1' }}>

            </div>
          </div>

          {tasks.map((value) => {
            return (
              <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
                <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
                  <i className="fa-solid fa-check me-2"></i>
                  {value.username}
                </div>
                <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
                  {value.tasks.map((task) => {
                    return (
                      <TaskCard
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
            )
          })}

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
            <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-check me-2"></i>
              Finalizadas
            </div>
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksFinalizadas.map((task) => {
                return (
                  <TaskCard
                    username={task.user.username}
                    startDate={DateTime.fromISO(task.startDate).toFormat('dd/MM/yyyy - HH:mm')}
                    endDate={DateTime.fromISO(task.endDate).toFormat('dd/MM/yyyy - HH:mm')}
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

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '100vh' }} >
            <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              <i className="fa-solid fa-check me-2"></i>
              Entregue
            </div>
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
              {tasksFinalizadas.map((task) => {
                return (
                  <TaskCard
                    username={task.user.username}
                    startDate={DateTime.fromISO(task.startDate).toFormat('dd/MM/yyyy - HH:mm')}
                    endDate={DateTime.fromISO(task.endDate).toFormat('dd/MM/yyyy - HH:mm')}
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
    </>
  );
}

