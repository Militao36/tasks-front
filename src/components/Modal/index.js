export function Modal({ title, children, xl = true, ID = "exampleModal" }) {
  const className = xl ? 'modal-xl' : ''

  return (
    <div className="modal fade" id={ID} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className={`modal-dialog ${className}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel">{title}</h6>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 