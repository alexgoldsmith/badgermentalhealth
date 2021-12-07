import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Post } from '../Interfaces/Interfaces'
import getStyles from '../Styling/Styling'

const styles = getStyles();

type propType = {
    post: Post
}

const FullPost: React.FC<propType> = ({post}) => {
    return (
        <TouchableOpacity
            style={[styles.card, {width: '100%'}]}
        >
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{post.Title}</Text>
            <Text style={{fontSize: 14}}>{post.Text}</Text>
            <Text>Author: {post.Author}</Text>
            <Text>Likes: {post.Likes} </Text>
        </TouchableOpacity>
        
    )
}

export default FullPost
