export function Card({ title, children }) {
  return (
    <div className="card mt-2 mb-4 ">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  )
}