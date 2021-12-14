import React, {useEffect, useState} from 'react'
import { Button, Text, ScrollView, View, ImageBackground } from 'react-native'
import PostCard from '../Components/PostsCard'
import getPosts from  '../Hooks/getPosts'
import getStyles from '../Styling/Styling'

type Post = {
    _id: Number,
    Title: String, 
    Author: String, 
    Text: String, 
    Date: Date, 
    Likes: Number, 
    NumReplies: Number,
}

type propType = {
    navigation: any,
    route: any,
}

const styles = getStyles();

const CBPosts: React.FC<propType> = ({navigation, route}) => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
		navigation.addListener('focus', () => loadPosts())
        loadPosts()
    }, [])

    const loadPosts = async () => {
        setPosts([]);
        const psts = await getPosts();
        setPosts(psts.reverse());
    }

    return (
		<ImageBackground source={require('../assets/com.jpg')} resizeMode="cover" style={[styles.image, {flex: 1}]}> 
        <View style={styles.post_container}>
            <View style={{height: 20, width: 30}} />
            <Button onPress={() => {navigation.navigate('Create', {mode: true, post: null})}} title='Create Post' color="steelblue" />
            <ScrollView >
                { 
                    posts.map((post, i)=>{
                        return <PostCard post={post} navigation={navigation} key={i}/>
                    })
                }
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

export default CBPosts
