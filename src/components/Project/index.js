import './style.css'

export function Project({ time, setor, title, porcetagem }) {
  return (
    <div className="card mt-4" style={{ height: "63.4vh" }}>
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
              <tr>
                <th>
                  <input class="form-check-input" type="checkbox" value="" checked disabled/>
                </th>
                <td>Winfit</td>
                <td>
                  <div className="input-group mb-3">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option>Lista</option>
                      <option value="1">Matheus</option>
                      <option value="2">Canelão</option>
                      <option value="3">Eriks</option>
                    </select>
                    <button className="btn btn-sm btn-secondary" type="button" id="button-addon2">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <div className="progress mt-2">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                  </div>
                </td>
                <td>
                  <a href="/">10</a>
                </td>
                <td className='actions'>
                  <button type="button" className="btn btn-sm btn-outline-secondary"><i className="fa-solid fa-pen-to-square"></i></button>
                  <button type="button" className="btn btn-sm btn-outline-danger"><i className="fa-solid fa-trash-can"></i></button>
                  <button type="button" className="btn btn-sm btn-outline-primary"><i className="fas fa-folder"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}