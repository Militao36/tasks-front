import './style.css'

export function Task({ username, title, startDate = '', endDate = '', border = "5px solid #212529" }) {
  return (
    <div
      className="card p-3 mt-3" style={{
        marginLeft: "2px",
        backgroundColor: '#f8f9fa',
        borderTop: border
      }}
    >
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <h6>{username?.toUpperCase()}</h6>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <div>
        <h6 className="mb-0 mt-1" style={{ fontSize: 14 }}>
          {title}
        </h6>
        <div className='mt-2'>
          <a href="/" style={{ textDecoration: 'none', fontSize: 12, color: 'black' }}>Inicio: {startDate}</a>
          <br />
          <a href="/" style={{ textDecoration: 'none', fontSize: 12, color: 'black' }}>Fim: {endDate}</a>
        </div>
      </div>
    </div>
  )
}