import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/api";
import ProjectService from "../services/ProjectService";

function useProject(id) {
  const [project, setProject] = useState({
    id: id,
    title: "",
    description: "",
    users: [],
  })

  function addUser(user = []) {
    if (user.length === 0) {
      return;
    }

    const userExists = project.users.filter((value) => value.id === user[0].id)

    if (userExists.length === 0) {
      setProject({
        ...project,
        users: project.users.concat(user)
      })
    }
  }

  async function createOrUpdated() {
    try {
      if (!project.id) {
        const id = await ProjectService.create(project)
        setProject({ ...project, id })
        return toast.success("Projeto salvo com sucesso")
      } else {
        await ProjectService.update(project.id, project)
        return toast.success("Projeto editado com sucesso")
      }
    } catch (error) {
      return toast.success("Não foi possível atualizar ou editar, tente novamente")
    }
  }

  async function findById() {
    if (!project.id) {
      return
    }

    const data = await ProjectService.findById(project.id)
    setProject({
      id: data.id,
      title: data.title,
      description: data.description,
      deliveryDate: data.deliveryDate ? String(data.deliveryDate).substring(0, 10) : "",
      expectedDate: String(data.expectedDate).substring(0, 10),
      status: data.status,
      users: data.users
    })
  }

  async function removeUserOfProject(id) {
    await api.delete(`/projects/${project.id}/${id}`)
      .finally(() => {
        setProject({
          ...project,
          users: project.users.filter(user => user.id !== id)
        })
      })
  }

  useEffect(() => {
    findById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id])

  return [setProject, project, addUser, createOrUpdated, removeUserOfProject]
}

export { useProject }