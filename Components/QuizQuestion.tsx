import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {Slider} from 'react-native-elements';

export default function QuizQuestion({min, max, question, index, updateScore}) {

	const [score, setScore] = useState<number>(min)

	return (
		<View style={{width: '80%', margin: 10, backgroundColor: 'white', padding: 20, borderRadius: 10}}>
			<Text style={{fontSize: 18}}>{question}</Text>
			<Text style={{fontSize: 12, textAlign: 'center', marginTop: 5}}>Answer: {Math.trunc(score)}</Text>
			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
			<Slider
				value={score}
				onValueChange={(value) => {
					updateScore(index, Math.trunc(value))
					setScore(value)
				}}
				maximumValue={max}
				minimumValue={min}
				thumbStyle={{height: 30, width: 30, backgroundColor: 'lightblue'}}
				style={{width: '100%'}}
			/>
		</View>
		</View>
	)
}
