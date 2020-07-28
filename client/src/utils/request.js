const request = async (path, options, headers = false) => {

    // TODO: update this variable bc we dont currently use docker
    //const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
    //            '' : 'http://localhost:3001'

    const URL = 'http://localhost:5000' // might not be 3001, not really sure
  
    options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      ...options
    }
  
    if (options.body)
      options.body = JSON.stringify(options.body)
  
    const response = await fetch(URL + path, options)
    const body = await response.json()
    if (response.status === 404) {
      if (body.code) {
        throw body.code
      } else {
        throw new Error()
      }
    }
  
  
    if(headers)
      return {body, headers: response.headers}
  
    return body
  }
  
  export default request