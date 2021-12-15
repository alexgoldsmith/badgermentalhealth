import axios from 'axios';
import { Post } from '../Interfaces/Interfaces';
import url from './getUrl'

const updatePost = async (post: Post) => {
	await fetch(url + '/updatePostLikes', {
		method: 'POST',
		headers: {
			post: JSON.stringify(post)
		}
	})
}

export default updatePost