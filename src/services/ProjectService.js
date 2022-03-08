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

  async comment(message, projectId, userId = '46781a2d-918b-4eda-acf9-3dd50e2c34bb') {
    await api.post('/comments', {
      comment: message,
      projectId: projectId,
      userId: userId
    })
  }

  async updateComment(message, projectId, commentId, userId = '46781a2d-918b-4eda-acf9-3dd50e2c34bb') {
    await api.put(`/comments/${commentId}`, {
      comment: message,
      projectId: projectId,
      userId: userId
    })
  }

  async deleteComment(id) {
    await api.delete(`/comments/${id}`)
  }

  async update(id, body) {
    await api.put(`/projects/${id}`, body)
  }

  async deleteUserOfProject(projectId, userId) {
    await api.delete(`/projects/${projectId}/${userId}`)
  }
}


export default new ProjectService()