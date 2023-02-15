import api from './api'
import esp from './esp'

const sendFileString = (fileString: string) => {
  return esp.post('/file', fileString, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

const convertToGcode = (file: any) => {
  return api.post('/convertFileToGcode', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { sendFileString, convertToGcode }


