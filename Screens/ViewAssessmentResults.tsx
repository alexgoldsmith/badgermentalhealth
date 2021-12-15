import React, { useEffect } from 'react'
import {TouchableOpacity, View, Text, ImageBackground} from 'react-native'
import getStorageData from '../Hooks/getStorageData';
import setStorageData from '../Hooks/setStorageData';
import getStyles from '../Styling/Styling';

type quizScoreType = {title: string, score: number}

const styles = getStyles();

export default function ViewAssessmentResults({route, navigation}) {
	const {quiz, scores} = route.params


	let total: number = scores.reduce((total, score) => total += score)

	useEffect(() => {
		updateQuizes();
	}, []);

	const updateQuizes = async () => {
		const user = await getStorageData('user');
		let quizes = await getStorageData(user.email + ':quizes');
		quizes = quizes !== null? quizes : []
		const total = scores.reduce((sum:number, score:number) => sum += score);
		var newQuizScores = [...quizes];
		const i = newQuizScores.findIndex((score: quizScoreType) => score.title === quiz.title)
		if (i === -1) {
			newQuizScores.push({title: quiz.title, score: total})
		}
		else {
			newQuizScores[i].score = total;
		}
		await setStorageData(user.email + ':quizes', newQuizScores);
	}

	let scoreResponse = ''
	let reachedEnd = false

	quiz.scoreKey.forEach(scorekey => {
		scorekey = scorekey.split(':')
		if (total <= parseInt(scorekey[0]) && !reachedEnd) {
			scoreResponse = scorekey[1];
			reachedEnd = true;
		}
	})


	return (
		<ImageBackground source={require('../assets/field.jpg')} resizeMode="cover" style={[styles.image, {flex: 1}]}> 
		<View style={[styles.container, {justifyContent: 'flex-start'}]}>
			<Text style={styles.card}>Your Score for {quiz.title} was {total}!</Text>
			<Text style={styles.card}>You have {scoreResponse}</Text>
			<TouchableOpacity 
				style={[styles.card, {backgroundColor: 'steelblue'}]}
				onPress={() => navigation.popToTop()}
			>
				<Text style={{fontSize: 16, color: 'white'}}>Take Another Assessment</Text>
			</TouchableOpacity>
		</View>
		</ImageBackground>
	)
}
