import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewPokemonList } from '../interfaces/pokemonReponse';
import { useTypeColorPokemon } from '../hooks/useTypeColorPokemon';

interface Props{
  pokemon: NewPokemonList;
}

const widthWindows = Dimensions.get('window').width;

export const PokemonCard = ( { pokemon }:Props ) => {

  const { isLoading, color } = useTypeColorPokemon( pokemon.id );
  const navigation = useNavigation();

  return(
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={ () => navigation.navigate('PokemonDetail', { NewPokemonList: pokemon }) }
    >
      <View
        style={{
          ...style.containerCard,
          width: widthWindows * 0.4,
          shadowColor: (isLoading) ? 'gray' : color[0]
        }}
      >
        <View
          style={{
            ...style.backgroundTop,
            backgroundColor: (isLoading) ? 'gray' : (color.length > 1) ? color[1] : color[0]
          }}
        />
        <View
          style={{
            ...style.backgroundBottom,
            backgroundColor: (isLoading) ? 'gray' : color[0]
          }}
        />
        <View style={ style.shine }/>
        <Image
          style={ style.pokeball }
          source={ require('./../../assets/pokeball-light.png') }
        />
        <View style={ style.pokemonShadow }/>
        <Image
          style={ style.pokemon }
          source={{ uri: pokemon.image }}
        />
        <Text
          style={ style.name }
        >
          { pokemon.name }
        </Text>
        <View style={ style.idBadge }>
          <Text style={ style.idText }>{ `#${pokemon.id}` }</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  containerCard: {
    borderRadius: 20,
    height: 120,
    marginBottom: 25,
    marginHorizontal: 10,
    overflow: 'hidden',
    width: 120,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    elevation: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7
  },
  backgroundTop: {
    backgroundColor: 'purple',
    bottom: "50%",
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },
  backgroundBottom: {
    backgroundColor: 'violet',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: "50%",
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },
  shine: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  pokeball: {
    height: 120,
    width: 120,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.7
  },
  pokemonShadow: {
    position: 'absolute',
    right: 6,
    bottom: 4,
    width: 70,
    height: 12,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  pokemon: {
    height: 100,
    width: 100,
    position: 'absolute',
    right: -8,
    bottom: -10
  },
  name: {
    fontSize: 25,
    color: "white",
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 8,
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  idBadge: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  idText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
});