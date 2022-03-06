import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { Card } from "../components/Card";
import { Editor } from "../components/Editor";
import { Menu } from "../components/Menu";
import { Comments } from "../components/Comment";
import { ModalMembers } from "../components/ModalMembers";
import ProjectService from "../services/ProjectService";

export function ProjectView() {
  const { id } = useParams();

  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    endDate: null,
    startDate: null,
    createdAt: null,
    updatedAt: null,
    status: '',
    users: [],
    timePast: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
    deliveryDateObject: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
    deliveryDate: ""
  })

  const [addMembers, setAddMembers] = useState([])

  useEffect(() => {
    findById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    addMembers.forEach((member) => {
      const user = project.users.filter((user) => user.id === member.id)
      if (user.length === 0) {
        setProject({
          ...project,
          users: [
            ...project.users,
            member
          ]
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMembers])


  async function findById() {
    const data = await ProjectService.findById(id)

    const date = DateTime.local()

    const startDate = data.startDate ? DateTime.fromISO(data.startDate) : null
    const endDate = data.endDate ? DateTime.fromISO(data.endDate) : null
    const deliveryDate = data.deliveryDate ? DateTime.fromISO(data.deliveryDate) : null

    let timePast = null
    let dateDelivery = null

    if (startDate && startDate?.isValid) {
      timePast = date.diff(startDate, ['day', 'hour', 'minute']).toObject()
    }

    if (deliveryDate && deliveryDate?.isValid) {
      dateDelivery = date.diff(deliveryDate, ['day', 'hour', 'minute'])?.toObject()
    }

    setProject({
      id: data.id,
      title: data.title,
      description: data.description,
      startDate: startDate?.toFormat('dd/MM/yyyy HH:mm') ?? '-',
      endDate: endDate?.toFormat('dd/MM/yyyy HH:mm') ?? '-',
      users: data.users,
      status: data.status,
      timePast: {
        days: timePast?.days || 0,
        hours: timePast?.hours || 0,
        minutes: timePast?.minutes?.toFixed(0) || 0,
      },
      deliveryDateObject: {
        days: dateDelivery?.days || 0,
        hours: dateDelivery?.hours || 0,
        minutes: dateDelivery?.minutes?.toFixed(0) || 0,
      },
      deliveryDate: deliveryDate?.toSQLDate() || ""
    })
  }

  async function update() {
    await ProjectService.update(id, {
      ...project,
      users: project.users,
      deliveryDate: project.deliveryDate
    })
    await findById()
  }

  async function deleteUsersOfProject(userId) {
    setProject({
      ...project,
      users: project.users.filter((user) => user.id !== userId)
    })

    await ProjectService.deleteUserOfProject(id, userId)
  }

  return (
    <>
      <Menu />
      <div className="container-fluid">
        <div >
          <div className="d-flex justify-content-between mt-3">
            <h2>Detalhes do projeto</h2>
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Projeto</li>
              </ol>
            </nav>
          </div>

        </div>
        <Card>
          <div className="row" style={{ minHeight: '80vh' }}>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4">
                  <div className="card shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Membros <i className="fa-solid fa-user-group text-success"></i></h5>
                      <b className="card-text text-center text-muted mb-0">{project.users.length} membros</b>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Tempo gasto <i className="fa-solid fa-clock text-primary"></i></h5>
                      <b className="card-text text-center text-muted mb-0">
                        {project.timePast.days} dia(s), {project.timePast.hours} hora(s), {project.timePast.minutes} minuto(s)
                      </b>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 shadow-sm">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title text-muted">Tempo de Atraso <i className="fa-solid fa-clock text-danger"></i></h5>
                      <b className="card-text text-center text-muted mb-0">
                        {project?.deliveryDateObject.days} dia(s), {project.deliveryDateObject.hours} hora(s), {project.deliveryDateObject.minutes} minuto(s)
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Editor value={project.description} />
                <hr />
                <Comments projectId={id}/>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="">
                <h3 className="bg-success text-light p-3 rounded" ><i className="fa-brands fa-buffer"></i>
                  {project.title} ({project.status})
                </h3>
              </div>

              <div className="text-muted mt-3">
                <p className="text-sm">Inicio
                  <b className="d-block">{project.startDate}</b>
                </p>
                <p className="text-sm mt-2">Fim
                  <b className="d-block">{project.endDate}</b>
                </p>

                <p className="text-sm mt-2">
                  <label htmlFor="">Data de Entrega</label>
                  <input className="form-control form-control-sm"
                    type="date" placeholder=".form-control-sm"
                    aria-label=".form-control-sm example"
                    value={project.deliveryDate}
                    onChange={(e) => setProject({ ...project, deliveryDate: e.target.value })}
                  />
                </p>
                <div className="text-sm mt-2">
                  <label htmlFor="">Status</label>
                  <div className="input-group mb-3">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value })}>
                      <option value={"draft"}>Rascunho</option>
                      <option value={"published"}>Publicado</option>
                    </select>
                  </div>

                </div>
              </div>

              <h5 className="mt-3 text-muted " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Lista de Membros
                <i className="fa-solid fa-circle-plus text-success ms-2" style={{ cursor: 'pointer' }}></i>
              </h5>

              <ol className="list-group list-group-flush mt-2 mb-3">
                {project.users.map((user) => {
                  return (
                    <li key={user.id} onClick={() => deleteUsersOfProject(user.id)} className="list-group-item d-flex justify-content-between align-items-start">
                      {user.username}
                      <i className="fa-solid fa-trash text-danger" style={{ cursor: 'pointer' }}></i>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-3 mb-3">
                <button className="btn btn-sm btn-primary" onClick={update}>Salvar Alterações</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <ModalMembers setAddMembers={setAddMembers} addMembers={addMembers} />
    </>
  )
}