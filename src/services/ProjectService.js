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

  async comment(message, projectId, userId = '579f1a73-0a81-40c7-ae85-faeb7aab63ae') {
    await api.post('/comments', {
      comment: message,
      projectId: projectId,
      userId: userId
    })
  }

  async updateComment(message, projectId, commentId, userId = '579f1a73-0a81-40c7-ae85-faeb7aab63ae') {
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