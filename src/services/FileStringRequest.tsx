import api from './api'

const sendFileString = (fileString: string) => {
  return api.post(`/fileString`, {fileString})
}

export { sendFileString }