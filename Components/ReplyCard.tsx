import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import getStyles from '../Styling/Styling'
import { Post, Replies } from "../Interfaces/Interfaces";
import updateReply from '../Hooks/updateReply';

const styles = getStyles();

type propType = {
    reply: Replies,
    author: String,
}

const ReplyCard: React.FC<propType> = ({reply}) => {
    const [likes, setLikes] = useState<number>(parseInt(reply.Likes.toString()));

    const increaseLikes = () => {
        setLikes(likes + 1)
        updateLikes(likes + 1)
    }
    
    const updateLikes = (likes: number | Number) => {
        reply.Likes = likes
        updateReply(reply)
    }
    
    return (
        <View style={[styles.postCard, {justifyContent: 'flex-end', width: '75%'}]}>
            <Text>{reply.Text}</Text>
            <TouchableOpacity 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 50}}
                    onPress={increaseLikes}
            >
                <>
                    <Image style={styles.like_image} source={require('../assets/like.webp')} /> 
                    <Text style={{fontSize: 20}}> {likes} </Text>
                </>
            </TouchableOpacity>
        </View>
    )
}

export default ReplyCard
