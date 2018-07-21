const DB = [
  {
    id: "00d9d442-0d54-4f27-ae30-c1ed6b9c8637",
    level: 0,
    text: "12312",
    timestamp: 1532022012589,
    title: "asdasd"
  }
]

class APIClient {
  constructor(options) {
    this.host = options.host
    this.port = options.port
  }

  getNotes = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(DB)
    }, 2000)
  })
  
  saveNote = data => {
  
  }
  
  deleteNote = data => {
  
  }
}

export default APIClient