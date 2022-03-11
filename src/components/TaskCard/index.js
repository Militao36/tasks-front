import { DateTime } from 'luxon'
import './style.css'

export function TaskCard({ username, title, startDate = '', endDate = '', border = "5px solid #212529" }) {
  return (
    <div
      className="card p-3 mt-3" style={{
        marginLeft: "2px",
        backgroundColor: '#f8f9fa',
        borderTop: border
      }}>
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <span style={{ fontSize: 14 }}><i className="fa-solid fa-user-secret"></i> {username || ' -'}</span>

        <div class="dropdown">
          <button class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="dropdown-item">Mover <i class="fa-solid fa-arrows-up-down-left-right"></i> </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="dropdown-item"><i className="fa-solid fa-check me-2"></i>Finalizar</li>
            <li class="dropdown-item"><i className="fa-solid fa-list-check me-2"></i> BackLog</li>
          </ul>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 14 }}>
          {title}
        </p>
        <a href="/" style={{ textDecoration: 'none', fontSize: 10, color: 'black', fontFamily: 'monospace' }}>
          {startDate ? "Inicio: " + DateTime.fromISO(startDate).toFormat('dd/MM/yyyy') : "Aguardando"}
        </a>
        <a href="/" className='ms-2' style={{ textDecoration: 'none', fontSize: 10, color: 'black' }}>
          {endDate ? "Fim: " + DateTime.fromISO(endDate).toFormat('dd/MM/yyyy') : null}
        </a>
      </div>
    </div>
  )
}