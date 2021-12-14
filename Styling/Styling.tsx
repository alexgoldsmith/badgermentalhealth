// https://reactnative.dev/docs/layout-props
import { StyleSheet } from "react-native"

export default function getStyling() {
    return StyleSheet.create({
        button: {
        },
        buttonContainer: {
            padding: 10
        },
        container: {
            alignItems: 'center',
            //backgroundColor: '#1f2f3f',
            backgroundColor: 'rgba( 0, 0, 0, 0.7)',
            flex: 1,
            flexDirection: "column",
            justifyContent: 'flex-start'
        },
        repliesContainer: {
            backgroundColor: 'rgba( 0, 0, 0, 0.7)',
            // backgroundColor: '#1f2f3f',
            alignItems: 'center',
            flex: 1,
            flexDirection: "column",
            justifyContent: 'flex-start'
        },
        h1: {
            color: 'white',
            fontSize: 32,
            marginBottom: 12,
            textAlign: 'center'
        },
        simpleText: {
            color: 'white',
            fontSize: 16,
            marginBottom: 10
        },
        card: {
            backgroundColor: 'white',
            margin: 20,
            padding: 20,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 10,
        },
        postCard: {
            backgroundColor: 'white',
            //flex: 1,
            marginTop: 10,
            padding: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'skyblue'
        },
        post_container: {
            backgroundColor: 'rgba( 0, 0, 0, 0.7)',
            //backgroundColor: '#1f2f3f',
            alignItems: 'center',
            flex: 1,
            flexDirection: "column",
            justifyContent: 'flex-start',
        },
        like : {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        like_image:{
            width: 25, 
            height: 25,
            flex: 1,
            flexDirection: 'row'
        },
        loginCard: {
            backgroundColor: 'white',
            margin: 20,
            padding: 10,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 10,
            flex: .025,
        },
        textInput: {
            backgroundColor: 'white', 
            height: 40, 
            width: '65%', 
            padding: 10, 
            marginTop: 10, 
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
        },
        image: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
            height: '100%',
        }, 
        
    })
}