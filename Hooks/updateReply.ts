import axios from 'axios';
import { Replies } from '../Interfaces/Interfaces';
import url from './getUrl'

const updateReply = async (reply: Replies) => {
	console.log("sending reply = ", reply)
	await fetch(url + '/updateReplyLikes', {
		method: 'POST',
		headers: {
			reply: JSON.stringify(reply)
		}
	})
}

export default updateReply