import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PokemonParams } from '../../navigator/PokemonNavigator';
import { useTypeColorPokemon } from '../../hooks/useTypeColorPokemon';
import { usePokemonFull } from '../../hooks/usePokemonFull';
import { PokemonInfo } from '../../components/PokemonInfo';

interface Props extends StackScreenProps<PokemonParams, 'PokemonDetail'>{};

export const PokemonDetail = ( { navigation, route }:Props ) => {
  const data = route.params.NewPokemonList;
  const { id, name, url, image } = data;
  const { isLoading, color } = useTypeColorPokemon(id);
  const { pokemonDetail } = usePokemonFull(id);


  return (
    <View
      style={{ flex: 1 }}
    >
      <Image
        style={{
          width: 400,
          height: 800,
          position: 'absolute',
          opacity: 0.88
        }}
        source={ require('./../../../assets/Van.jpg') }
      />
      <View
        style={{ flex: 2, alignItems: 'center' }}
      >
        <View style={{
          ...style.leftContainer,
          opacity: 0.70,
          backgroundColor: (isLoading) ? 'gray' : (color.length > 1) ? color[1] : color[0]
        }}/>

        <View style={{
          ...style.rightContainer,
          opacity: 0.70,
          backgroundColor: (isLoading) ? 'gray' : color[0]
        }}/>
        
        <Image
          source={ require('./../../../assets/pokeball-light.png') }
          style={ style.pokeball }
        />

        <Image
          source={{ uri: image }}
          style={ style.pokemon }
        />
        <View style={ style.tiposContainer }>
          { pokemonDetail.types?.map( ( { type }, index ) => (
            <View
              key={ type.name }
              style={{ ...style.tipo, 
                backgroundColor: color[index] ?? 'gray'
              }}
          >
              <Text style={ style.tipoTexto }>{ type.name }</Text>
          </View>
        ))}
      </View>

        <TouchableOpacity
          onPress={ () => navigation.goBack() }
        >
          <View
            style={ style.arrowBtn }
          >
            <Text
              style={{ 
                ...style.text,
                fontWeight: 'bold'
                 }}
            >

              {`Back`}
              
            </Text>
          </View>
    
        </TouchableOpacity>
        <View
            style={{
                ...style.arrowBtn,
                left: 190,
                elevation: 10,
                width: 180,
                top: 0,
                backgroundColor: '#2F5DA8',
                borderColor:'white',
                borderWidth: 2,
              }}
          >
            <Text
              style={{ 
                ...style.text,
                fontWeight: 'bold',
                color: 'white'
                 }}
            >
              {`${name}`}

            </Text>
          </View>
          <View
            style={{
                ...style.arrowBtn,
                left: 290,
                elevation: 10,
                width: 80,
                top: 300,
                backgroundColor: '#2F5DA8',
                borderColor:'white',
                borderWidth: 2,
              }}
          >
            <Text
              style={{ 
                ...style.text,
                fontWeight: 'bold',
                color: 'white'
                 }}
            >
              {`${id}`}

            </Text>
          </View>
      </View>

      <View
        style={{ flex: 2 }}
      >
        {
          (!pokemonDetail) ? (
            <ActivityIndicator
              size={100}
              color={color[0]}
            />
          ) :
          (
            <PokemonInfo
              pokemon={ pokemonDetail }
              color={color}
            />
          )
        }
      </View>
    </View>
  );
}

const style = StyleSheet.create({
    leftContainer: {
    borderTopLeftRadius: 1000,
    backgroundColor: 'gray',
    borderBottomLeftRadius: 1000,
    height: "100%",
    left: 0,
    position: 'absolute',
    top: 0,
    width: "50%",
    opacity: 0.5
  },
  rightContainer: {
    borderBottomRightRadius: 1000,
    backgroundColor: 'pink',
    borderTopRightRadius: 1000,
    height: "100%",
    position: 'absolute',
    right: 0,
    top: 0,
    width: "50%",
    opacity: 0.5
  },
  pokeball: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: 30,
    opacity: 0.7,
  },
  pokemon: {
    height: 240,
    width: 240,
    position: 'absolute',
    top: 60,
  },
  arrowBtn: {
    left: -180,
    top: 0,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    width: 100,
    marginTop: 10,
    alignItems: 'center'

  },
  headerContainer: {
    alignItems: 'center',
    height: 370,
    zIndex: 999,
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
  containerBottom: {
    top: 370,
    height: 500,
    width: "100%",
    position: 'absolute'
  },                    
  tiposContainer: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    gap: 10
  },
  tipo: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white'
  },
  tipoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize'
  }
});