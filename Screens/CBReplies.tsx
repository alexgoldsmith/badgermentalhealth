import React, {useEffect, useState} from 'react'
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native'
import PostsCard from '../Components/PostsCard'
import FullPost from '../Components/FullPost'
import ReplyCard from '../Components/ReplyCard'
import getReplies from '../Hooks/getReplies'
import getStyles from '../Styling/Styling'
import { Post, Replies } from '../Interfaces/Interfaces'

const styles = getStyles();

type propType = {
    navigation: any,
    route: any,
}

const CBReplies: React.FC<propType> = ({navigation, route}) => {
    const post = route.params.post
    
    const [replies, setReplies] = useState<Replies[]>([])
    
    useEffect(() => {
		navigation.addListener('focus', () => loadReplies())
        loadReplies();
    }, [])

    const loadReplies = async () => {
        const repls = await getReplies(post._id);
        setReplies(repls);
    }
    
    return (
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
            <View style={{height: 15, width: 30}} />
            <Button onPress={() => {navigation.goBack()}} title='Back' color="steelblue" />
            <FullPost post={post} />
            <ScrollView>
                {
                    replies.map((reply, i) => {
                        return <ReplyCard reply={reply} author={post.author} key={i}/>
                    })
                }
            </ScrollView>
            <View style={{height: 20, width: 30}} />
            <Button onPress={() => {navigation.navigate('Create', {mode: false, post: post})}} title='Reply' color="steelblue" />
            <View style={{height: 15, width: 30}} />
        </View>
    )
}

export default CBReplies
