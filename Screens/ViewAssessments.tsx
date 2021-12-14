import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import QuizCard from '../Components/QuizCard'
import getQuizes from '../Hooks/getQuizes'
import getStyling from '../Styling/Styling'

type Quiz = {
	title: string,
	description: string,
	questions: string[],
	minPerQuestion: number,
	maxPerQuestion: number,
	answerLegend: string[],
	scoreKey: string[]
}

const styles = getStyling();

export default function ViewAssessments({navigation}) {

	const [quizes, setQuizes] = useState<Quiz[]>([]);

	useEffect(() => {
		loadQuizes();
	}, []);

	const loadQuizes = async () => {
		const quizArray = await getQuizes()
		setQuizes(quizArray);
	}

	return (
		<ImageBackground source={require('../assets/field.jpg')} resizeMode="cover" style={[styles.image, {flex: 1}]}> 
		<View style={styles.container}>
			<ScrollView>
				{quizes.length !== 0 && 
					<View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
						{quizes.map((quiz, i) => {
							return <QuizCard quiz={quiz} navigation={navigation} key={i} />
						})}
					</View>
				}
			</ScrollView>
		</View>
		</ImageBackground>
	)
}
