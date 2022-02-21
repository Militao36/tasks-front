import { Menu } from '../components/Menu'
import { Task } from '../components/Task';

function PageProject() {
  return (
    <>
      <Menu />
      <div className="container-fluid" style={{ backgroundColor: '#f4f6f9' }}>
        <div className="row">
          <div className="col-sm-6 mt-2">
            <h3>Board</h3>
          </div>
          <div className="col-sm-6 d-none d-sm-block mt-2 ">
            <ol className="breadcrumb d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-secondary me-2">New Task</button>
              <button type="button" className="btn btn-sm btn-secondary">Secondary</button>
            </ol>
          </div>
        </div>

        <div className='board d-flex overflow-scroll mb-1' style={{ width: '100%' }}>
          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '82vh' }}>
            <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              Backlog
            </div>
            <div className="card-body overflow-scroll mb-2 mb-2" style={{ border: '2px solid #797c7e', borderTop: 0 }}>
              <Task
                title={"Adicionar nova cultura, no povoamento"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
            </div>
          </div>

          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '82vh' }} >
            <div className="card-header bg-success text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              Finalizadas
            </div>
            <div className="card-body overflow-scroll mb-2" style={{ border: '2px solid #797c7e', borderTop: 0 }}>
              <Task
                title={"Tela de cliente"}
                border={"5px solid #198754"}
                time={"Prazo: 01/02/2022"}
                labels={[
                  {
                    name: 'Iniciado',
                    color: 'bg-primary'
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default PageProject;
