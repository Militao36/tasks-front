import React from 'react';
import { Link } from 'react-router-dom';

export function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Tasks</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={'/tasks/board'}>
                Board
              </Link>
            </li>
           
          </ul>
          <form className="d-flex">
            <input className="form-control form-control-sm me-2" type="search" placeholder="Pesquisar" aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>
  );
}
