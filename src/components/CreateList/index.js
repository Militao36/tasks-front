import { useState } from "react";
import { api } from "../../config/api";
import { Modal } from "../Modal";
import { toast } from "react-toastify";

export function CreateList({ projectId }) {
  const [listTitle, setListTitle] = useState("")

  async function save() {
    try {
      if (!listTitle || !projectId) return
      await api.post('/lists', { title: listTitle, projectId })
       return toast.success("Salvo com sucesso!")
    } catch (error) {
      return toast.success("Não foi possível salvar")
    }
  }

  async function handle() {
    await save()
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
        id="btn-save-list"
        style={{ float: 'right' }}
        onClick={handle}>
        Salvar
      </button>
    </Modal>
  )
}