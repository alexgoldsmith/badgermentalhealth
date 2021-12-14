import React from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import getStyles from '../Styling/Styling';

type QuizCardType = {
	title: string,
	description: string,
	questions: string[],
	minPerQuestion: number,
	maxPerQuestion: number,
	answerLegend: string[],
	scoreKey: string[]
}

type propType = {
	navigation: any,
	quiz: QuizCardType,
}

const styles = getStyles();

const QuizCard : React.FC<propType> = ({navigation, quiz}) => {

	if (!quiz) {
		return <></>
	}

	return (
		<TouchableOpacity
			onPress={() => {navigation.navigate('TakeAssessment', { quiz: quiz })}}
			style={[styles.card, {width: '80%'}]}
		>
			<Text style={{fontSize: 14, fontWeight: 'bold'}}>{quiz.title}</Text>
			<Text>{quiz.description}</Text>
		</TouchableOpacity>
	)
}

export default QuizCard;