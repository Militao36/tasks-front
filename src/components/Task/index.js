import './style.css'

export function Task({ title, time, labels = [] }) {

  return (
    <div className="card p-3 mt-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="icon"> <i className="fa-solid fa-face-grin-wide"></i> </div>
          <div className="ms-2 c-details">
            <h6 className="mb-0">{title}</h6>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="mt-3 overflow-auto" style={{ maxHeight: 70 }}>
          {labels.map(({ name, color }) => {
            return (
              <span key={name} className={`badge ${color} me-2`}>{name}</span>
            )
          })}
         
        </div>
      </div>
    </div>
  )
}