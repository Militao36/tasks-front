import { Card } from "../components/Card";
import { Editor } from "../components/Editor";
import { Menu } from "../components/Menu";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { api } from "../config/api";


export function ProjectEdit() {
  const { id } = useParams();

  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    end_date: null,
    start_date: null,
    created_at: null,
    updated_at: null,
    users: [],
    timePast: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
    deliveryDate: {
      "days": 0,
      "hours": 0,
      "minutes": 0
    },
  })

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState([])

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(({ data }) => {
        setProject({
          id: data.id,
          title: data.title,
          description: data.description,
          end_date: data.end_date,
          start_date: data.start_date,
          created_at: data.created_at,
          updated_at: data.updated_at,
          users: data.users,
          timePast: {
            "days": data?.timePast?.days || 0,
            "hours": data?.timePast?.hours || 0,
            "minutes": data?.timePast?.minutes?.toFixed(0) || 0,
          },
          deliveryDate: {
            "days": data?.deliveryDate?.days || 0,
            "hours": data?.deliveryDate?.hours || 0,
            "minutes": data?.deliveryDate?.minutes?.toFixed(0) || 0,
          }
        })
        loadComments()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  async function loadComments() {
    const { data } = await api.get(`/comments/?type=project&id=${id}`)
    setComments(data)
  }

  async function Comment() {
    if (!comment) {
      return
    }

    await api.post('/comments', { comment, project_id: id, user_id: 'a39d5b44-61eb-4bea-adff-9a20650f6f6f' })
    await loadComments()
    setComment("")
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
                        {project?.deliveryDate.days} dia(s), {project.deliveryDate.hours} hora(s), {project.deliveryDate.minutes} minuto(s)
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Editor value={project.description} />
                <hr />
                <div className="comments mt-4">
                  <div className="comment mb-4">

                    <form>
                      <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Digite seu comentario ...</label>
                        <textarea onChange={(e) => setComment(e.target.value)} value={comment} className="form-control form-control-sm" id="comment" rows="5"></textarea>
                      </div>
                      <button type="button" className="btn btn-sm btn-success" onClick={() => Comment()}>Comentar</button>
                    </form>
                  </div>

                  <div>
                    <h4><i className="fa-solid fa-bars-staggered text-success"></i> Atividades</h4>
                  </div>
                  <div className="mt-4">
                    {comments.map((comment) => {
                      return (
                        <div key={comment.id}>
                          <div className="d-flex justify-content-between mt-2">
                            <span style={{ fontSize: 18 }}>{comment.user.username}</span>
                            <b className="text-muted" style={{ fontSize: 12 }}>
                              {comment.created_at}
                            </b>
                          </div>
                          <div className="card mt-2">
                            <div className="card-body" style={{ whiteSpace: 'pre-wrap' }}>
                              {comment.comment}
                            </div>
                          </div>

                          <div className="d-flex justify-content-end mt-1">
                            {/* <div className="d-flex justify-content-end">
                              <a href="/" className="text-muted ms-2 decoratation"><i className="fa-solid fa-image"></i></a>
                              <a href="/" className="text-muted ms-2 decoratation">@</a>
                            </div> */}
                            <a href="/" className="">Editar</a>
                            <a href="/" className="ms-2">Excluir</a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="">
                <h3 className="bg-success text-light p-3 rounded" ><i className="fa-brands fa-buffer"></i> 
                    {project.title}
                </h3>
              </div>

              <div className="text-muted mt-3">
                <p className="text-sm">Inicio
                  <b className="d-block">{project.start_date}</b>
                </p>
                <p className="text-sm mt-2">Fim
                  <b className="d-block">{project.end_date || 'Em desenvolvimento'}</b>
                </p>
              </div>

              <h5 className="mt-5 text-muted">
                Lista de Membros
                <i className="fa-solid fa-circle-plus text-success ms-2" style={{ cursor: 'pointer' }}></i>
              </h5>
              <ol className="list-group list-group-flush mt-3 mb-3">
                {project.users.map((user) => {
                  return (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-start">
                      {user.username}
                      <i className="fa-solid fa-square-arrow-up-right text-dark" style={{ cursor: 'pointer' }}></i>
                    </li>
                  )
                })}
              </ol>

              {/* <h5 className="mt-5 text-muted">Arquivos Projeto</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="btn-link text-secondary"><i className="far fa-fw fa-file-word"></i> Contract-10_12_2014.docx</a>
                </li>
              </ul> */}
              <div className="mt-5 mb-3">
                <button className="btn btn-sm btn-primary">Add Tasks</button>
                {/* <button className="btn btn-sm btn-warning ms-2">Report contact</button> */}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}