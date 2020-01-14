import axios from 'axios';
import { responseError, response, request } from './interceptors';

const baseURL = '/';

const http = axios.create({
	baseURL: baseURL,
	headers: {
		'X-Requested-With': 'shuyun.com',
	},
	withCredentials: true
});

http.interceptors.request.use(request.interceptor);
http.interceptors.response.use(response.retvalInterceptor, responseError.httpErrorInterceptor);


export default http;
