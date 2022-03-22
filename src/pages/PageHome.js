import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { ProjectList } from '../components/ProjectList';
import { TaskCard } from '../components/TaskCard';
import { api } from "../config/api";

export function PageHome() {
  const [tasksInProgress, setTasksInProgress] = useState([])
  const statusTasks = 'in-progress'

  useEffect(() => {
    api.get(`/tasks/status/${statusTasks}`)
      .then(({ data }) => {
        setTasksInProgress(data)
      })
  }, [])

  return (
    <>
      <Menu />
      <div className="container-fluid mt-2 row" >
        <div className='col-sm-10 col-md-8'>
          <ProjectList />
        </div>
        <div className="col-sm-2 col-md-4">
          <h5 className="card-title text-start">Tarefas em andamento</h5>
          {tasksInProgress.map((task, index) => {
            return (
              <TaskCard
                key={task.id}
                task={
                  {
                    ...task,
                    border: "5px solid #343a40",
                    setIdTaskMove: "",
                    click: () => { },
                    edit: () => { },
                    home: true
                  }
                }
              />
            )
          })}

        </div>
      </div>
    </>
  );
}