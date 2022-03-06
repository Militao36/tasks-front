import { api } from "../config/api"

class ProjectService {
  async findById(id) {
    const { data } = await api.get(`/projects/${id}`)

    return data
  }

  async loadComments(id) {
    const { data } = await api.get(`/comments/?type=project&id=${id}`)

    return data
  }

  async comment(message, id, userId = '2521bb24-53e2-4136-ba9d-c5ef9d123118') {
    await api.post('/comments', {
      comment: message,
      project_id: id,
      user_id: userId
    })
  }

  async update(id, body) {
    await api.put(`/projects/${id}`, body)
  }

  async deleteUserOfProject(projectId, userId) {
    await api.delete(`/projects/${projectId}/${userId}`)
  }
}


export default new ProjectService()