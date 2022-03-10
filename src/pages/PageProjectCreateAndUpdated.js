import React from 'react'
import { Menu } from '../components/Menu'
import { useParams } from 'react-router-dom'
import { ProjectCreateAndUpdated } from '../components/ProjectCreateAndUpdated';

export function PageProjectCreateAndUpdated() {
  const { id } = useParams();

  return (
    <>
      <Menu />
      <div className='container-fluid'>
        <div className="d-flex justify-content-between mt-3">
          <h3>Cadastro de projeto</h3>
          <nav aria-label="breadcrumb ">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Projeto</li>
            </ol>
          </nav>
        </div>
        <ProjectCreateAndUpdated id={id} />
      </div>
    </>
  )
}