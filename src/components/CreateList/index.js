import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { Modal } from "../Modal";

export function CreateList({ listId }) {
  const [listTitle, setListTitle] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    if (listId)
      setId(listId)
    else
      setId("")
  }, [listId])

  async function save() {
    if (!listTitle) return

    const { data } = await api.post('/lists', { title: listTitle })
    setId(data.id)
  }

  async function updated() {
    if (!listTitle || !id) return

    await api.put(`/lists/${id}`, { title: listTitle })
  }

  async function handle() {
    if (!id) {
      return await save()
    }

    return await updated()
  }

  return (
    <Modal title={"Cadastro de lista"} xl={false}>
      <label className="form-label">Titulo</label>
      <input
        type="email"
        className="form-control form-control-sm"
        onChange={(e) => setListTitle(e.target.value)}
      />
      <button
        className="btn btn-sm btn-success mt-2"
        style={{ float: 'right' }}
        onClick={handle}>
        Salvar
      </button>
    </Modal>
  )
}