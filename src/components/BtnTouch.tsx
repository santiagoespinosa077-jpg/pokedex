import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
  text: string;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const BtnTouch = ( { text, color='blue', borderColor='white', borderWidth=4, style: extraStyle, onPress }: Props ) => {
  return(
    <TouchableOpacity
      onPress={ () => onPress() }
    >
      <View
        style={[
          style.container,
          { backgroundColor: color, borderColor: borderColor, borderWidth: borderWidth },
          extraStyle
        ]}
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