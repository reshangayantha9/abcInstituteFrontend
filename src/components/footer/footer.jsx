import React from 'react'

function footer() {
  return (
    <div >
        <footer className="bg-light text-center text-white ">
          
          <div className="container ">
            
            <section >
              
              
              
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#0082ca'}} href="https://www.linkedin.com/in/rgayantha/" role="button"><i class="bi bi-linkedin"></i></a>
              
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#333333'}} href="https://github.com/reshangayantha9" role="button"><i class="bi bi-github"></i></a>
            </section>
            
          </div>
          
          <div className="text-center p-1 m-0" style={{backgroundColor: 'rgba(0, 0, 0)'}}>
            © 2023 Developed : Reshan Gayantha
          </div>
          
        </footer>
      </div>
  )
}

export default footer