import React, {useState, useEffect} from 'react'
import { TouchableHighlight, Text, View, TextInput, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import loginUser from '../Hooks/loginUser'
import registerUser from '../Hooks/registerUser'
import setStorageData from '../Hooks/setStorageData'
import getStorageData from '../Hooks/getStorageData'
import getQuizes from '../Hooks/getQuizes'
import getStyles from '../Styling/Styling'

type mode = '' | 'Log In' | 'Register'

const styles = getStyles();

const Login = ({ navigation }) => {

	useEffect(() => {
		//loginIfUser();
	}, [])

	const loginIfUser = async () => {
		if (await getStorageData('user') !== null) {
			navigation.navigate('Home')
		}
	}

	const [mode, setMode] = useState<mode>('');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [status, setStatus] = useState('');

	return (
		<View style={[styles.container, {justifyContent: 'center', minHeight: 500}] }>
			<Text style={{color: 'white', fontSize: 32}}>Badger Break</Text>
			{mode === '' &&
			<>
				<TouchableHighlight
					onPress={() => setMode('Log In')}
					style={[styles.loginCard, {backgroundColor: 'steelblue', minHeight: 35, margin: 15}]}
				>
					<Text style={{color: 'white', fontSize: 16}}>Login</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => setMode('Register')}
					style={[styles.loginCard, {backgroundColor: 'steelblue', minHeight: 35, margin: 15}]}
				>
					<Text style={{color: 'white', fontSize: 16}}>Register</Text>
				</TouchableHighlight>
			</>
			}
			{mode !== '' &&
			<>
				<TextInput
					onChangeText={setEmail}
					value={email}
					secureTextEntry={false}
					placeholder="Email"
					style={styles.textInput}
				/>
				<TextInput
					onChangeText={setPassword}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					style={styles.textInput}
				/>
				<View style={{display: 'flex', flexDirection: 'row'}}>
				<TouchableHighlight
					onPress={() => {setMode(''); setStatus('')}}
					style={[styles.loginCard, {backgroundColor: 'steelblue', minHeight: 35, margin: 15, minWidth: 100}]}
				>
					<Text style={{fontSize: 16, color: 'white'}}>Back</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={[styles.loginCard, {backgroundColor: 'steelblue', minHeight: 35, margin: 15, minWidth: 100}]}
					onPress={async () => {
						try { 
							if (mode === 'Log In')
								var result = await loginUser(email, password)
							else
								var result = await registerUser(email, password)

							if (result.message !== undefined) {
								setStatus(result.message);
								return;
							}
							
							setStorageData('user', {email: email, token: result.token})
							navigation.navigate('Home');
						}
						catch (e: any) { setStatus(e.toString()) }
					}}
				>
					<Text style={{fontSize: 16, color: 'white'}}>{mode}</Text>
				</TouchableHighlight>
				</View>
			</>
			}
			{status !== '' && 
				<View style={[styles.loginCard, {borderColor: 'red', borderWidth: 3, minHeight: 100}]}>
					<Text style={{color: 'red', fontSize: 18}}>{status}</Text>
				</View>
			}
		</View>
	)
}

export default Login