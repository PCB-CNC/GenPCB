import api from './api'

const sendFileString = (fileString: string) => {
  return api.post(`/file`, {fileString})
}

export { sendFileString }