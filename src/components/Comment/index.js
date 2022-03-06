/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react"
import ProjectService from "../../services/ProjectService"

export function Comments({ projectId }) {
  const [comments, setComments] = useState([])

  const [comment, setComment] = useState({
    id: null,
    message: ''
  })

  useEffect(() => {
    loadComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function loadComments() {
    const data = await ProjectService.loadComments(projectId)
    setComments(data)
  }

  async function InserComment() {
    if (!comment || !comment.message) {
      return
    }

    if (comment.id)
      await ProjectService.updateComment(comment.message, projectId, comment.id)
    else
      await ProjectService.comment(comment.message, projectId)

    await loadComments()
    setComment({
      id: null,
      message: ''
    })
  }

  async function RemoveComment(id) {
    if (window.confirm("Deseja realmente deletar?")) {
      await ProjectService.deleteComment(id)
      setComments(comments.filter((value) => value.id !== id))
    }
  }

  return (
    <div className="comments mt-4">
      <div className="comment mb-4">

        <form>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Digite seu comentario ...</label>
            <textarea
              onChange={(e) => setComment({
                id: comment.id ? comment.id : null,
                message: e.target.value
              })}
              value={comment.message}
              className="form-control form-control-sm" id="comment" rows="5"
            >
            </textarea>
          </div>
          <button type="button" className="btn btn-sm btn-success" onClick={() => InserComment()}>Comentar</button>
        </form>
      </div>

      <div>
        <h4><i className="fa-solid fa-bars-staggered text-success"></i> Atividades</h4>
      </div>
      <div className="mt-4">
        {comments.map((value) => {
          return (
            <div key={value.id}>
              <div className="d-flex justify-content-between mt-2">
                <span style={{ fontSize: 18 }}>{value.user.username}</span>
                <b className="text-muted" style={{ fontSize: 12 }}>
                  {value.createdAt}
                </b>
              </div>
              <div className="card mt-2">
                <div className="card-body" style={{ whiteSpace: 'pre-wrap' }}>
                  {value.comment}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-1">
                <a className="ms-2" style={{ cursor: 'pointer' }}
                  onClick={() => setComment({
                    id: value.id,
                    message: value.comment
                  })}
                >Editar</a>
                <a className="ms-2" style={{ cursor: 'pointer' }}
                  onClick={() => RemoveComment(value.id)}>Excluir</a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}