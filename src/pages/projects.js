import { Menu } from '../components/Menu'
import { Task } from '../components/Task';

function PageProject() {
  return (
    <>
      <Menu />
      <div className="container-fluid" style={{ backgroundColor: '#f4f6f9' }}>
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <h3>Board</h3>
          </div>
          <div className="d-none d-sm-block mt-2 ">
            <ol className="breadcrumb d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-outline-dark me-2">New Task</button>
            </ol>
          </div>
        </div>

        <div className='board d-flex overflow-auto mb-1' style={{ width: '100%',height:'100%' }}>
          <div className="card me-2" style={{ minWidth: 300, width: 300, border: 'none', height: '82.1vh' }}>
            <div className="card-header bg-dark text-white" style={{ borderRadius: '5px 5px 0 0' }}>
              Backlog
            </div>
            <div className="card-body overflow-auto mb-2 mb-2" style={{ backgroundColor: '#f0f0f1' }}>
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
            <div className="card-body overflow-auto mb-2" style={{ backgroundColor: '#f0f0f1' }}>
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
