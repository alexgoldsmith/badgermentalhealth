import { setStatusBarTranslucent } from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import { TextInput, Text, View, TouchableOpacity, Button, ImageBackground } from 'react-native'
import getStorageData from '../Hooks/getStorageData'
import postPost from '../Hooks/postPost'
import postReply from '../Hooks/postReply'
import getStyles from '../Styling/Styling'

type Reply = {
    Text: String, 
    Author: String, 
    PostId: Number,
    Date: String, 
    Likes: Number
}

type Post = {
    Title: String, 
    Author: String, 
    Text: String, 
    Date: String, 
    Likes: Number, 
    NumReplies: Number,
}

const styles = getStyles();

const CMPost = ({navigation, route}) => {
    
	// Mode will be true if we are submitting a post, false if we are submitting a reply
	const mode = route.params.mode
	const post = route.params.post

	const [Title, setTitle] = useState('')
	const [Txt,   setText ] = useState('')
    const [status, setStat] = useState('')
    
    return (
		<ImageBackground source={require('../assets/com.jpg')} resizeMode="cover" style={[styles.image, {flex: 1}]}> 
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
			<View style={{height: 15, width: 30}} />
			<Button onPress={() => {navigation.goBack()}} title='Back' color="steelblue" />
			<View style={[styles.card, {width: '90%'}]}>
				<Text>Make your {(mode)? "Post" : "Reply"}</Text>
				{mode && 
					<TextInput
						onChangeText={setTitle}
						value={Title}
						secureTextEntry={false}
						placeholder="Post Title"
						style={styles.textInput}
					/>
				}
				<TextInput
						onChangeText={setText}
						value={Txt}
						secureTextEntry={false}
						placeholder="Post Text"
						style={styles.textInput}
				/>
				<TouchableOpacity
					style={[styles.card, {backgroundColor: 'steelblue', height: 35, margin: 15, padding: 0, width: 150}]}
					onPress={async () => {
						// submit correct type of document to the api
						const user = await getStorageData('user');

						if (mode && Title.length < 12) {
							setStat("Your Title must be at least 12 characters!");
							return;
						}

						if (Txt.length < 24) {
							setStat("Your Post must be at least 24 characters!");
							return;
						}

						if (mode) {
							const newPost: Post = {
								Title, 
								Text: Txt, 
								Author: user.email, 
								Date: JSON.stringify(new Date()),
								Likes: 0,
								NumReplies: 0
							}
							// send it off to the api
							try { 
								await postPost(newPost);
								navigation.goBack();
							}
							catch (err) {
								setStat(err.message);
							}
						}
						else { 
							const reply: Reply = {
								Text: Txt,
								Author: user.email,
								Date: JSON.stringify(new Date()),
								PostId: post._id,
								Likes: 0
							}
							// send it off to the api
							try { 
								await postReply(reply);	
								navigation.goBack();						
							}
							catch (err) {
								setStat(err.message);
							}
						}
					}}
				>
					<Text style={{fontSize: 16, color: 'white'}}>Submit {(mode)? "Post" : "Reply"}</Text>
				</TouchableOpacity>
			</View>

			{status !== '' && 
				<View style={[styles.card, {borderWidth: 5, borderColor: 'red', maxWidth: '90%'}]}>
					<Text>{status}</Text>
				</View>
			}
        </View>
		</ImageBackground>
    )
}

export default CMPost
