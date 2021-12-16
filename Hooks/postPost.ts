import axios from 'axios';
import url from './getUrl';

const postPost = async (post: any) => {
	await fetch(url + '/posts', {
		method: 'POST',
		headers: {
			post: JSON.stringify(post)
		}
	})
}

export default postPost