import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { Modal } from "../Modal";

export function CreateList({ projectId, idList, reload }) {
  const [list, setList] = useState({
    id: "",
    title: "",
  })

  async function save() {
    try {
      if (!list.title || !projectId) return
      const response = await api.post('/lists', { title: list.title, projectId })
      setList({
        ...list,
        id: response.data.id
      })

      return alert("Lista criada com sucesso")
    } catch (error) {
      return alert("Erro ao criar lista")
    }
  }

  async function updated() {
    try {
      if (!list.title || !projectId) return
      await api.put(`/lists/${list.id}`, { title: list.title, projectId })

      return alert("Lista criada com sucesso")
    } catch (error) {
      return alert("Erro ao criar lista")
    }
  }

  async function handle() {
    if (list.id) {
      await updated()
    } else {
      await save()
    }
    await reload(false)
    setList({
      id: '',
      title: ''
    })
  }

  async function findById() {
    const response = await api.get(`/lists/${idList}`)
    setList({
      id: response.data.id,
      title: response.data.title
    })
  }

  useEffect(() => {
    if (idList) {
      findById()
    } else {
      setList({
        id: "",
        title: ""
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idList])


  return (
    <Modal title={"Cadastro de lista"} ID={"create-list-of-modal"} xl={false}>
      <label className="form-label">Titulo</label>
      <input
        type="email"
        className="form-control form-control-sm"
        value={list.title}
        onChange={(e) => setList({
          ...list,
          title: e.target.value,
        })}
      />
      <button
        className="btn btn-sm btn-success mt-2"
        id="btn-save-list"
        style={{ float: 'right' }}
        onClick={handle}>
        Salvar
      </button>
    </Modal>
  )
}