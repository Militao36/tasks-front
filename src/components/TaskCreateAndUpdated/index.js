import { Card } from '../Card'

export function TaskCreateAndUpdated() {
  return (
    <Card>
      <div className="row">
        <div className='col-sm-6'>
          <label htmlFor="">Nome do Projeto</label>
          <input
            className="form-control form-control-sm"
            type="text"
          />
        </div>
        <div className='col-sm-2'>
          <label htmlFor="">Data de Entrega</label>
          <input
            className="form-control form-control-sm"
            type="date"
          />
        </div>
        <div className='col-sm-2'>
          <label htmlFor="">Data Prevista de Entrega</label>
          <input
            className="form-control form-control-sm"
            type="date"
          />
        </div>
        <div className='col-sm-2'>
          <label htmlFor="">Status</label>
          <input
            className="form-control form-control-sm"
            type="text"
            disabled
          />
        </div>
        <div className='col-sm-12 mt-3'>
          <h6>Descrição</h6>
        </div>
        <div className='mt-3 row'>
          <div className="col-sm-5">
            <label htmlFor="">Membros</label>
            <div className="input-group">
              <select className="form-select form-select-sm" defaultValue={null} aria-label=".form-select-sm example">
                <option value={null}>Selecione</option>
              </select>
              <button className="btn btn-sm btn-success" type="button">Adicionar</button>
            </div>
          </div>

          <div className="col-sm-7">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">Usuário</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
               
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-sm-12 d-flex justify-content-end'>
          <button className='btn btn-sm btn-dark'>Salvar informações</button>
        </div>
      </div>
    </Card>
  )
}