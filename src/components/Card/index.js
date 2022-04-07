export function Card({ title, children }) {
  return (
    <div className="card mt-2 mb-4 ">
      <div className="card-body">
        {title &&
          <div className="card-header">
            <h6>{title}</h6>
          </div>
        }
        {children}
      </div>
    </div>
  )
}