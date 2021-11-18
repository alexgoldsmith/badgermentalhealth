import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import getStorageData from '../Hooks/getStorageData'
import CopingCard from '../Components/CopingCard'
import getStyling from '../Styling/Styling'
import setStorageData from '../Hooks/setStorageData'
import { setupFilesAfterEnv } from '../jest.config'

type cCard = {
	emotion: string,
	text: string
}

const styles = getStyling();

export default function CopingCards() {

	const [ccards, setcCards] = useState<cCard[]>([]); 
	const [emotion, setEmotion] = useState<string>('');
	const [text, setText] = useState<string>('');

	useEffect(async () => {
		const user = await getStorageData('user')
		const cardArray = await getStorageData(user.email + ":cCards");
		if (cardArray !== null) {
		 	setcCards(cardArray)
		}
	}, []);

	useEffect(() => {
		let newFilter = []
		ccards.forEach((card) => {
			if (!newFilter.includes(card.emotion)) {
				newFilter.push(card.emotion)
			}
		})
		setFilter(newFilter)
	}, [ccards])

	const updateStorage = async (cCards: cCard[]) => {
		const user = await getStorageData('user')
		await setStorageData(user.email + ":cCards", cCards);
	}

	const addCard = async (newCard: cCard) => {
		updateStorage([...ccards, newCard])
		setcCards([...ccards, newCard])
	}

	const updateCard = async (index: number, newCard: cCard) => {
		var newCards = [...ccards]
		newCards.splice(index, 1, newCard)
		updateStorage(newCards)
		setcCards(newCards);
	}

	const delCard = async (index: number) => {
		var newCards = [...ccards]
		newCards.splice(index, 1)
		updateStorage(newCards)
		setcCards(newCards);
	}

	const [filter, setFilter] = useState<string[]>([]);

	const filterCards = (card: cCard) => {
		return filter.includes(card.emotion) || filter.length === 0
	}

	let allEmotions = ccards.map((card: cCard) => card.emotion);
	allEmotions = allEmotions.filter((emotion: string, i: number) => allEmotions.indexOf(emotion) === i)

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Coping Cards</Text>

			<View style={{backgroundColor: '#DDDDDD', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%', padding: 10, borderRadius: 10}}>
				<Text style={{fontSize: 14}}>Add a New Coping Card</Text>
				<TextInput
					onChangeText={setEmotion}
					value={emotion}
					secureTextEntry={false}
					placeholder="Emotion"					
					style={{backgroundColor: 'white', height: 40, width: 150, padding: 10, marginTop: 10, marginBottom: 10, borderColor: '#000', borderWidth: 1, borderRadius: 5}}
				/>
				<TextInput
					onChangeText={setText}
					value={text}
					secureTextEntry={false}
					placeholder="Description"
					style={{backgroundColor: 'white', height: 40, width: 150, padding: 10, marginTop: 10, marginBottom: 10, borderColor: '#000', borderWidth: 1, borderRadius: 5}}
				/>
				<Button
					onPress={() => addCard({emotion: emotion, text: text})}
					title='Add New Card'
					color='green'
				/>
				{filter.length !== 0 ?
					<Text style={{color: 'black'}}>Filter Categories</Text> : <></>
				}

				<View style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center'}}>
					{allEmotions.map(emotion => {
						return <Button
							onPress={() => {
								let newFilter = [...filter]
								if (!newFilter.includes(emotion)) {
									newFilter.push(emotion)
								}
								else {
									newFilter = newFilter.filter((emote) => emote !== emotion)
								}
								setFilter(newFilter)
							}}
							title={emotion}
							color={filter.includes(emotion)? 'green' : 'red'}
						/>
					})}
				</View>
			</View>
			<ScrollView>
				{ccards.filter((ccard) => filterCards(ccard)).map((ccard, i) => {
					return <CopingCard 
						ccard={ccard} 
						key={i} 
						editCard={(cCard: cCard) => {updateCard(i, cCard)}}
						delCard={() => {delCard(i)}}
					/>
				})}
			</ScrollView>
		</View>
	)
}
