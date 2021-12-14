import React, {useState} from 'react'
import {ScrollView, Text, View, Button, TouchableHighlight, ImageBackground} from 'react-native';
import {Slider} from 'react-native-elements';
import QuizQuestion from '../Components/QuizQuestion';
import getStyling from '../Styling/Styling';

type Quiz = {
	title: string,
	description: string,
	questions: string[],
	minPerQuestion: number,
	maxPerQuestion: number,
	answerLegend: string[],
	scoreKey: string[]
}

class ScoreManager {
	scores: number[];
	constructor(questions, min) {
		this.scores = questions.map(question => min)
	}

	updateScore(index: number, score: number) {
		this.scores[index] = score;
	}
}

const styles = getStyling();

export default function TakeAssessment({route, navigation}) {
	const quiz = route.params.quiz;

	// const scoreOptions: number[] = []
	// for (let i = quiz.minPerQuestion; i <= quiz.maxPerQuestion; i++) {
	// 	scoreOptions.push(i)
	// }

	const [scm, setSCM] = useState(new ScoreManager(quiz.questions, quiz.minPerQuestion));

	const updateScore = (index, score) => {
		scm.updateScore(index, score);
	}

	return (
		<ImageBackground source={require('../assets/field.jpg')} resizeMode="cover" style={[styles.image, {flex: 1}]}> 
		<View style={styles.container}>
		<ScrollView>
			<View style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15}}>
				<View style={{width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 10}}>
					<Text>Please answer each question according to how it best matches the following key: </Text>
					{quiz.answerLegend.map((answerKey: string, i: number) => {
						return <Text style={{fontWeight: 'bold', marginTop: 3}}>{i + quiz.minPerQuestion}: {answerKey}</Text>
					})}
					<View style={{display: 'flex', alignItems: 'center'}}>
						<TouchableHighlight
							onPress={() => navigation.goBack()}
							style={{backgroundColor: 'steelblue', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8, height: 35, borderRadius: 10, width: 250}}
						>
							<Text style={{color: 'white', fontSize:14}}>Back</Text>
						</TouchableHighlight>
					</View>
				</View>
				
				{quiz.questions.map((question: string, i: number) => {
					return (
						<QuizQuestion
							min={quiz.minPerQuestion}
							max={quiz.maxPerQuestion}
							question={question}
							key={i}
							index={i}
							updateScore={updateScore}
						/>
					)
				})}

				<TouchableHighlight
					style={{backgroundColor: 'steelblue', width: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, height: 40, marginBottom: 20, marginTop: 10}}
					onPress={() => {
						navigation.navigate('ViewAssessmentResuts', {scores: scm.scores, quiz: quiz});
					}}
				>
					<Text style={{color: 'white', fontSize: 18}}>Complete Assessment</Text>
				</TouchableHighlight>
			</View>
			<View style={{height: 75}}></View>
		</ScrollView>
		</View>
		</ImageBackground>
	)
}

/* Button implementation if Slider get's negative feedback
<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
	{scoreOptions.map((option) => {
		return <Button 
			onPress={() => {
				updateScore(i, option);
			}}
			title={option.toString()}
		/>
	})}
</View>
*/

/* Slider implementation
<Slider
	value={scores[i]}
	onValueChange={(value) => updateScore(i, value)}
	maximumValue={quiz.maxPerQuestion}
	minimumValue={quiz.minPerQuestion}
	thumbStyle={{height: 30, width: 30, backgroundColor: 'lightblue'}}
/>
*/