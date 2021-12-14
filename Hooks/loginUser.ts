const axios = require('axios');
const base64 = require('base-64');

import url from './getUrl'

type response = {
	token?: string,
	message?: string
}

const loginUser = async (email: string, password: string): Promise<response> => {
	console.log("email = ", email)
	const encoded = base64.encode(email + ':' + password);

	return await axios.get(url + '/login', {
		headers: {
			token: encoded
		}
	})
		.then( (response: any) => response.data)
		.catch( (err: any) => {return {message: err.message}})
}

export default loginUser;