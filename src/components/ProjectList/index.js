/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../config/api'
import './style.css'

export function ProjectList({ time, setor, title, porcetagem }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get(`/projects`)
      .then(({ data }) => {
        setProjects(data)
      })
  }, [])

  function calculatePercentageOfProject(project) {
    if (!project) {
      return 0
    }

    const { tasksCount, tasksEnd, tasks_not_end } = project
    const result = (tasksEnd / tasksCount) * 100;

    return isNaN(result) ? 0 : result
  }

  return (
    <div className="card mt-4" style={{ height: "90vh" }}>
      <div className="card-header">
        Projects
      </div>
      <div className="card-body">
        <div className="table-responsive" style={{ height: "100%" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: '1%', minWidth: 20 }}>#</th>
                <th style={{ width: '15%', minWidth: 150 }}>Nome</th>
                <th style={{ width: '10%', minWidth: 200 }}>Membros</th>
                <th style={{ width: '20%', minWidth: 200 }}>Progresso</th>
                <th style={{ width: '10%', minWidth: 100 }}>Tasks</th>
                <th style={{ width: '5%', minWidth: 200 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <th>
                      #
                    </th>
                    <td>
                      <Link to={'/'} style={{ textDecoration: 'none' }}>
                        {project.title}
                      </Link>
                    </td>
                    <td>
                      <div className="input-group mb-3">
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          {project.users.map((user) => {
                            return (
                              <option key={user.id} value={user.id}>{user.username}</option>
                            )
                          })}
                          
                          {project.users.length === 0 && <option>Nenhum membro</option>}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="progress mt-2">
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${calculatePercentageOfProject(project)}%` }} aria-valuenow={calculatePercentageOfProject(project)} aria-valuemin="0" aria-valuemax="110">
                          {calculatePercentageOfProject(project)}%
                        </div>
                      </div>
                    </td>
                    <td>
                      <b>{project.tasksCount}</b>
                    </td>
                    <td className='actions'>
                      <Link to={`/project/${project.id}`}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button type="button" className="btn btn-sm btn-outline-danger"><i className="fa-solid fa-trash-can"></i></button>
                      <button type="button" className="btn btn-sm btn-outline-primary"><i className="fas fa-folder"></i></button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}