import {View, Text, StyleSheet} from 'react-native';
import {BtnTouch} from '../components/BtnTouch';
import {useCounterReducer} from '../hooks/useCounterReducer';


export const ConterReducerScreen = () =>{

	const{state, add, decrement, reset, add2, decrement2 }= useCounterReducer ({count:0});

	return (
		<view 
			style={style.container}
		>
			<text
				style={style.text}
			>

			</text>
			<BtnTouch
				text="Add",
				color='violet',
				borderColor='white',
				onPress={ ()=> add ()}
			/>

			<BtnTouch
        	text="Add2"
        	onPress={ () => add2() }
      		/>
			
			<BtnTouch
				text="Decrement",
				color='red',
				borderColor='orange',
				onPress={ ()=> decrement()}
			/>
			
			<BtnTouch
        	text="Decrement2"
        	onPress={ () => decrement2() }
      		/>

			<BtnTouch
				text="Reset",
				onPress={()=> reset()}

			/>
		
		</View>
	);
}

const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'gray',
    color: 'pink',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
});