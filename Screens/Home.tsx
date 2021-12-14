import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import getStorageData from '../Hooks/getStorageData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getStyling from '../Styling/Styling'
import { Quiz } from '../Interfaces/Interfaces'

type cCard = {
	emotion: string,
	text: string
}

type quizScoreType = {
	title: string, 
	score: number
}

export default function Home({navigation}) {
	const [cCards, setcCards] = useState<cCard[]>([]);
	const [quizes, setQuizes] = useState<quizScoreType[]>([]);
	
	const [showAssessments, setShowAssessments] = useState<boolean>(false);

	useEffect(() => {
		navigation.addListener('focus', () => loadData())
		loadData();
	}, [])

	const loadData = async () => {
		const user = await getStorageData('user')

		const cards = await getStorageData(user.email + ':cCards');
		const allQuizes = await getStorageData(user.email + ':quizes');

		setQuizes(allQuizes !== null? allQuizes : []);
		setcCards(cards !== null? cards : [])
	}

	const styles = getStyling();

	return (
		<ImageBackground source={require('../assets/fear.png')} resizeMode="cover" style={styles.image}> 
		<View style={[styles.container, {justifyContent: 'flex-start'}]}>
			<ScrollView>
				<TouchableOpacity 
					style={[styles.card, {width: 300}]}
					onPress={() => navigation.navigate('Coping Cards')}
				>
					<Text style={{fontSize: 16, fontWeight: 'bold'}}>Coping Cards</Text>
					<Text style={{fontSize: 14}}>You have {cCards.length} Coping Cards</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.card}
					onPress={() => setShowAssessments(!showAssessments)}
				>
					<Text style={{fontSize: 16, fontWeight: 'bold'}}>Your Assessments</Text>
					<Text style={{fontSize: 14}}>You have taken {quizes.length} Assessment(s)</Text>
					<Text style={{fontSize: 14}}>Press Here to show/hide</Text>
					{showAssessments &&
						<>
							{quizes.map((quiz: quizScoreType) => {
								return (<View style={{borderColor: '#000', borderWidth: 1, padding: 10, margin: 10}}>
									<Text style={{fontSize: 14}}>{quiz.title}: {quiz.score}</Text>
								</View>)
							})}
						</>
					}
				</TouchableOpacity>

				<TouchableOpacity 
					style={[styles.card, {width: 300}]}
					onPress={() => navigation.navigate('Posts')}
				>
					<Text style={{fontSize: 16, fontWeight: 'bold'}}>Community Board</Text>
					<Text style={{fontSize: 14}}>Come hang with our community!</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={[styles.card, {backgroundColor: 'steelblue'}]}	
					onPress={async () => {
						await AsyncStorage.removeItem('user');
						navigation.goBack();
					}}
				>
					<Text style={{fontSize: 14, color: 'white'}}>Sign Out</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={[styles.card, {backgroundColor: 'red'}]}	
					onPress={async () => {
						const user = await getStorageData('user')
						await AsyncStorage.removeItem(user.email + ':cCards');
						await AsyncStorage.removeItem(user.email + ':quizes');
						await loadData();
					}}
				>
					<Text style={{fontSize: 14, color: 'white'}}>Delete Your Local Data</Text>
				</TouchableOpacity>
				
			</ScrollView>
		</View>
		</ImageBackground > 
	)
}
