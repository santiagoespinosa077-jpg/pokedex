import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  text: string;
  color?: string;
  borderColor?: string;
  onPress: () => void;
}

export const BtnTouch = ( { text, color='blue', borderColor='white', onPress }: Props ) => {
  return(
    <TouchableOpacity
      onPress={ () => onPress() }
    >
      <View
        style={{
          ...style.container,
          backgroundColor: color,
          borderColor: borderColor
        }}
      >
        <Text
          style={style.text}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 4,
    height: 40,
    justifyContent: 'center',
    margin: 4,
    width: 150
  },
  text: {
    fontSize: 20,
    color: 'white',
  }
})