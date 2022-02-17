import { Menu } from '../components/Menu'
import { ProjectCard } from '../components/ProjectCard';

function PageProject() {
  return (
    <>
      <Menu />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12 col-xl-8 row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <ProjectCard
                time={"1 days ago"}
                setor={"Programação"}
                title={"Winfit Web"}
                porcetagem={"50%"}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <ProjectCard
                time={"1 days ago"}
                setor={"Programação"}
                title={"Winfit Web"}
                porcetagem={"50%"}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <ProjectCard
                time={"1 days ago"}
                setor={"Programação"}
                title={"Winfit Web"}
                porcetagem={"50%"}
              />
            </div>
          </div>
          <div className="col-sm-12 col-xl-4 row mt-2" >
            
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProject;
