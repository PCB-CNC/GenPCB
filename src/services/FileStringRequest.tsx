import api from './api'

const sendFileString = (fileString: string) => {
  return api.post('/file', fileString, {
              headers: {
                'Content-Type': 'text/plain'
              }
            })}

export { sendFileString }