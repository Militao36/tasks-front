import { DateTime } from 'luxon'
import './style.css'

export function TaskCard({ username, title, startDate = '', endDate = '', border = "5px solid #212529" }) {
  return (
    <div
      className="card p-3 mt-3" style={{
        marginLeft: "2px",
        backgroundColor: '#f8f9fa',
        borderTop: border
      }}
    >
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <h6>{username?.toUpperCase()}</h6>
        <i className="fa-solid fa-caret-down" style={{ cursor: 'pointer' }}></i>
      </div>
      <div>
        <h6 className="mb-0 mt-1" style={{ fontSize: 14 }}>
          {title}
        </h6>
        <div className='mt-2'>
          <a href="/" style={{ textDecoration: 'none', fontSize: 12, color: 'black', float: "right" }}>
            {startDate ? "Inicio: " + DateTime.fromISO(startDate).toFormat('dd/MM/yyyy - HH:mm') : "Aguardando"}
          </a>
          <br />
          <a href="/" style={{ textDecoration: 'none', fontSize: 12, color: 'black' }}>
            {endDate ? "Fim: " + DateTime.fromISO(endDate).toFormat('dd/MM/yyyy - HH:mm') : null}
          </a>
        </div>
      </div>
    </div>
  )
}