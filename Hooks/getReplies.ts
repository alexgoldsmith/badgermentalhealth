import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import url from './getUrl'


const getReplies = async (postId: string) => {
	return await fetch(url + '/replies', {
		method: 'GET',
		headers: {
			postId: postId
		}
	})
		.then(response => response.json())
		.catch(error => ['Could not fetch replies']);
}

export default getReplies

const styles = StyleSheet.create({})
