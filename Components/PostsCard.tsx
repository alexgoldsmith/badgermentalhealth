import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import getStyles from '../Styling/Styling'
import {Post} from '../Interfaces/Interfaces'
import { TouchableHighlight } from 'react-native-gesture-handler'
import updatePost from '../Hooks/updatePost'

type propType = {
    post: Post,
    navigation: any,
}

const styles = getStyles();

const PostCard: React.FC<propType> = ({post, navigation}) => {
    const [likes, setLikes] = useState<number>(post.Likes)
    //const [likes, setLikes] = useState<number>(parseInt(post.Likes.toString()))
    
    const increaseLikes = () => {
        setLikes(likes + 1);
        updateLikes(likes + 1)
    }
    
    const updateLikes = (likes) => {
        post.Likes = likes
        updatePost(post);
    }
   
    return (
        <View
            style={[styles.postCard, {width:'100%', padding: 20}]}
        >
            <TouchableOpacity 
                onPress={() => {navigation.navigate("Replies", {post})}}
            >
            <Text style={{fontSize: 20}}>{post.Title}</Text>
            <View style={{height: 15}}/>
            </TouchableOpacity>
            <View style={styles.like}>
                <TouchableOpacity 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
                    onPress={increaseLikes}
                >
                    <>
                        <Image style={styles.like_image} source={require('../assets/like.webp')} /> 
                        <Text style={{fontSize: 20}}> {likes}  </Text>
                    </>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostCard
