import { api } from "../config/api"

class ProjectService {
  async findById(id) {
    const { data } = await api.get(`/projects/${id}`)

    return data
  }

  async create(body) {
    const { data } = await api.post('/projects', body)
    return data
  }

  async loadComments(id, type) {
    const { data } = await api.get(`/comments/?type=${type}&id=${id}`)

    return data
  }

  async comment(message, id, type) {
    const body = {
      comment: message,
    }
    
    if (type === 'project') {
      body['projectId'] = id
    } else {
      body['taskId'] = id
    }

    await api.post('/comments', body)
  }

  async updateComment(message, commentId) {

    await api.put(`/comments/${commentId}`, {
      comment: message,
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