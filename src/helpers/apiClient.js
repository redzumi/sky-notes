import axios from 'axios';

class APIClient {
  constructor(options) {
    this.host = options.host || 'localhost';
    this.port = options.port || 80;

    this.api = axios.create({
      baseURL: `http://${this.host}:${this.port}/api/`,
    });
  }

  getNotes = async () => {
    const res = await this.api.get('/notes');
    return res.data;
  };

  saveNote = async (data) => {
    const res = await this.api.post('/note', data);
    return res.data;
  };

  deleteNote = async (data) => {
    const res = await this.api.delete('/note', data);
    return res.data;
  };
}

export default APIClient;
