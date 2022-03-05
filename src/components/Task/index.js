import './style.css'

export function Task({ username, title, time, labels = [], border = "5px solid #212529", prefix }) {
  return (
    <div
      className="card p-3 mt-3" style={{
        marginLeft: "2px",
        backgroundColor: '#f8f9fa',
        borderTop: border
      }}
    >
      <div className="d-flex justify-content-between" style={{ color: "#666", fontSize: 12 }}>
        <h6>{username}</h6>
        <i className="fas fa-pen" style={{ cursor: "pointer", }}></i>
      </div>
      <div>
        <h6 className="mb-0 mt-1" style={{ fontSize: 14 }}>
          {title}
        </h6>
        <div className='d-flex justify-content-between mt-2'>
          <a href="/" style={{ textDecoration: 'none', fontSize: 12, color: 'black' }}>{time}</a>
          <a href="/" style={{ textDecoration: 'none', fontSize: 12 }}>#{prefix}</a>
        </div>
      </div>
    </div>
  )
}