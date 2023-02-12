import api from './api'

const sendFileString = (fileString: string) => {
  return api.post('/file', fileString, {
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


