import { Menu } from './components/Menu'
import { Task } from './components/Task';

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="container row">
        <div className='col-sm-4'>
          <Task
            title={"Adicionar tela de cliente"}
            status={"Finalizada"}
            labels={[
              {
                name: 'Iniciado',
                color: 'bg-primary'
              },
              {
                name: 'Pausado',
                color: 'bg-danger'
              },
              {
                name: 'Pausado',
                color: 'bg-danger'
              },
              {
                name: 'Pausado',
                color: 'bg-danger'
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
