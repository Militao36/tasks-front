import { DateTime } from "luxon"

export function TablesBoard({ listName, tasks = [], viewTask, createTask }) {
  return (
    <>
      <h3>{listName}</h3>
      <div className="overflow-auto">
        <table className="table table-sm" >
          <thead>
            <tr>
              <th scope="col">Usuário</th>
              <th scope="col">Title</th>
              <th scope="col">Inicio</th>
              <th scope="col">Fim</th>
            </tr>
          </thead>
          <tbody >
            {tasks.map((task) => {
              return (
                <tr key={task.id} >
                  <td><b>{task.user.username}</b></td>
                  <td>{task.title}</td>
                  <td>
                    {task.startDate ? DateTime.fromISO(task.startDate).toFormat('dd/MM/yyyy HH:mm') : "Aguardando"}
                  </td>
                  <td>
                    {task.endDate ? DateTime.fromISO(task.endDate).toFormat('dd/MM/yyyy HH:mm') : null}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-dark" onClick={() => createTask(task.id, task.listId)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-dark" onClick={() => viewTask(task.id)}>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
