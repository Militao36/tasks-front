import './style.css'

export function ProjectCard({ time, setor, title, porcetagem }) {
  return (
    <div className="card p-3 mt-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="icon"> <i className="fa-brands fa-mailchimp"></i> </div>
          <div className="ms-2 c-details">
            <span>{time}</span>
          </div>
        </div>
        <div className="badge"> <span>{setor}</span> </div>
      </div>
      <div className="mt-3">
        <h3 className="heading">{title}</h3>
        <div className="mt-3">
          <div className="progress" style={{ height: 3 }}>
            <div className="progress-bar bg-success" role="progressbar" style={{ width: porcetagem }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="mt-3"> <span className="percentage">{porcetagem} <span className="status">Em desenvolvimento</span></span> </div>
        </div>
      </div>
    </div>
  )
}