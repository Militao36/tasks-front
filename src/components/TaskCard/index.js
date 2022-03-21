/* eslint-disable jsx-a11y/anchor-is-valid */
import { DateTime } from 'luxon'
import './style.css'

export function TaskCard({ task: { id, user, title, startDate = '', endDate = '', click, setIdTaskMove } }) {
  const style = {
    marginLeft: "2px",
    backgroundColor: '#f8f9fa',
    borderTop: "5px solid #212529",
  }

  return (
    <div className="card p-3 mt-3" style={style}>
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <span style={{ fontSize: 14 }}>{user?.username || ' -'}</span>

        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item" onClick={() => setIdTaskMove(id)}>
              Mover <i className="fa-solid fa-arrows-up-down-left-right"></i>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="dropdown-item">
              Excluir
            </li>
            <li className="dropdown-item">
              Visualizar
            </li>
          </ul>
        </div>
      </div>
      <div onClick={click}>
        <p style={{ fontSize: 14 }}>
          {title}
        </p>
        <a style={{ textDecoration: 'none', fontSize: 10, color: 'black', fontFamily: 'monospace' }}>
          {startDate ? "Inicio: " + DateTime.fromISO(startDate).toFormat('dd/MM/yyyy') : "Aguardando"}
        </a>
        <a className='ms-2' style={{ textDecoration: 'none', fontSize: 10, color: 'black' }}>
          {endDate ? "Fim: " + DateTime.fromISO(endDate).toFormat('dd/MM/yyyy') : null}
        </a>
      </div>
    </div>
  )
}