/* eslint-disable jsx-a11y/anchor-is-valid */
import { DateTime } from 'luxon';
import { api } from '../../config/api';
import './style.css';

export function TaskCard({ task: { id, user, title, startDate = '', endDate = '', click, setIdTaskMove, edit, home = false, setlistProps, listProps } }) {
  const style = {
    marginLeft: "2px",
    backgroundColor: '#f8f9fa',
    borderTop: "5px solid #212529",
  }

  const setStartTask = async () => {
    try {
      await api.put(`/tasks/${id}`, { startDate: DateTime.local() })
      setlistProps(!listProps)
    } catch (error) {

    }
  }
  const setEndDate = async () => {
    try {
      await api.put(`/tasks/${id}`, { endDate: DateTime.local() })
      setlistProps(!listProps)
    } catch (error) {

    }
  }

  const retormaTarefa = async () => {
    try {
      await api.put(`/tasks/${id}`, { endDate: null, startDate: null })
      setlistProps(!listProps)
    } catch (error) {

    }
  }

  return (
    <div className="card p-3 mt-3" style={style}>
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <span style={{ fontSize: 14 }}>{user?.username || ' -'}</span>

        {!home &&
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
              <li className="dropdown-item" onClick={edit}>
                Editar
              </li>
              <li className="dropdown-item">
                Excluir
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-item" onClick={setStartTask}>
                Iniciar
              </li>
              <li className="dropdown-item" onClick={setEndDate}>
                Finalizar
              </li>
              <li className="dropdown-item" onClick={retormaTarefa}>
                Retomar Tarefa
              </li>
            </ul>
          </div>
        }
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