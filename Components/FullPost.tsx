import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Post } from '../Interfaces/Interfaces'
import getStyles from '../Styling/Styling'

const styles = getStyles();

type propType = {
    post: Post
}

const FullPost: React.FC<propType> = ({post}) => {
    const [likes, setLikes] = useState<number>(parseInt(post.Likes.toString()))
    
    const increaseLikes = () => {
        setLikes(likes + 1)
    }

    return (
        <View
            style={[styles.postCard, {width: '95%', padding: 20}]}
        >
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{post.Title}</Text>
            <Text style={{fontSize: 14}}>{post.Text}</Text>
            <TouchableOpacity 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 50, marginRight: 30}}
                    onPress={increaseLikes}
            >
                <>
                    <Image style={styles.like_image} source={require('../assets/like.webp')} /> 
                    <Text style={{fontSize: 20}}> {likes}  </Text>
                </>
            </TouchableOpacity>
        </View>
    )
}

export default FullPost
