import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-2c676.firebaseio.com/'
});

export default instance;