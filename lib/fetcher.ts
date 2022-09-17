import axios from 'axios';

const fetcher = {
	get: (url: string) => axios.get(url).then(res => res.data),
	post: (url: string, body: any) => axios.post(url, body).then(res => res.data),
	patch: (url: string, body: any) => axios.patch(url, body).then(res => res.data),
	delete: (url: string, params: any) => axios.delete(url, { params }),
}

export default fetcher;