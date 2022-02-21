// import { Menu } from './components/Menu'
// import { Project } from './components/Project';
import PageProject from './pages/projects';

function App() {

  return (
    <PageProject/>
  )
  // return (
  //   <>
  //     <Menu />
  //     <div className="container-fluid mt-2 row" >
  //       <h2>Dashboard</h2>
  //       <div className='col-sm-10 col-md-8'>
  //         <div className="row d-flex justify-content-evenly">
  //           <div class="card text-white bg-success col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
  //             <div class="card-body d-flex">
  //               <p class="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
  //                 <i class="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
  //               </p>
  //               <div>
  //                 <p class="card-text">
  //                   100
  //                 </p>
  //                 <p>Tarefas finalizadas</p>
  //               </div>
  //             </div>
  //           </div>
  //           <div class="card text-white bg-danger col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
  //             <div class="card-body d-flex">
  //               <p class="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
  //                 <i class="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
  //               </p>
  //               <div>
  //                 <p class="card-text">
  //                   100
  //                 </p>
  //                 <p>Tarefas atrasadas</p>
  //               </div>
  //             </div>
  //           </div>
  //           <div class="card text-white bg-warning col-lg-3 mt-2" style={{ height: 100, minWidth: 250 }}>
  //             <div class="card-body d-flex">
  //               <p class="card-title" style={{ fontSize: '1.0em', marginRight: 20 }}>
  //                 <i class="fa-solid fa-list-check" style={{ fontSize: "2em" }}></i>
  //               </p>
  //               <div>
  //                 <p class="card-text">
  //                   100
  //                 </p>
  //                 <p>Tarefas em espera</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <Project />
  //       </div>
  //       <div className="col-sm-2 col-md-4">
  //         <h5 className="card-title text-start">Tarefas em andamento</h5>
  //         <Task
  //           title={"Adicionar tela de cliente"}
  //           status={"Finalizada"}
  //           time={"Prazo: 01/02/2022"}
  //           labels={[
  //             {
  //               name: 'Iniciado',
  //               color: 'bg-primary'
  //             },
  //             {
  //               name: 'Pausado',
  //               color: 'bg-danger'
  //             },

  //           ]}
  //         />
  //       </div>
  //     </div>
  //   </>
  // );
}

export default App;
