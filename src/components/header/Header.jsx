import React from 'react'


function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000/">ABC institute</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="http://localhost:3000/">Student</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/program">Program</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/allregister">Enroll</a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
  )
};
export default Header