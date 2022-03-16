import { Editor } from '../Editor'

export function TaskCreateAndUpdated() {
  return (
    <div className="card mt-2 mb-4 container-fluid">
      <div className="card-body">
        <h5 class="card-title">Cadastro de tarefas</h5>

        <div className="row">
          <div className='col-sm-3'>
            <label htmlFor="">Nome</label>
            <input
              className="form-control form-control-sm"
              type="text"
            />
          </div>
          <div className='col-sm-3'>
            <label htmlFor="">Branch</label>
            <input
              className="form-control form-control-sm"
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className='col-sm-12 mt-3'>
            <label className=''>Descrição</label>
            <Editor
              view={false}

            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className="col-sm-3">
            <label htmlFor="">Membro</label>
            <div className="input-group">
              <select className="form-select form-select-sm" defaultValue={null} aria-label=".form-select-sm example">
                <option value={null}>Selecione</option>

              </select>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-sm-2'>
            <label htmlFor="">Data de Inicio</label>
            <input
              className="form-control form-control-sm"
              type="date"
            />
          </div>
          <div className='col-sm-2'>
            <label htmlFor="">Data de fim</label>
            <input
              className="form-control form-control-sm"
              type="date"
            />
          </div>
          <div className='col-sm-2'>
            <label htmlFor="">Previsão de Entrega</label>
            <input
              className="form-control form-control-sm"
              type="date"
            />
          </div>
        </div>
        <div className='col-sm-12 d-flex justify-content-end'>
          <button className='btn btn-sm btn-success'>Salvar informações</button>
        </div>
      </div>
    </div>
  )
}