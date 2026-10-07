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
      style={{ flex: 1, backgroundColor: '#eef1f6' }}
    >
      <Image
        style={{
          width: 400,
          height: 400,
          position: 'absolute',
          opacity: 0.88,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40
        }}
        blurRadius={1}
        source={ require('./../../../assets/cerezo.jpg') }
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

        <View style={ style.glow }/>
        
        <Image
          source={ require('./../../../assets/pokeball-light.png') }
          style={ style.pokeball }
        />

        <View style={ style.groundShadow }/>

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
          activeOpacity={0.8}
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
                shadowColor: '#2F5DA8',
                shadowOpacity: 0.5,
                shadowRadius: 8
              }}
          >
            <Text
              style={{ 
                ...style.text,
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'capitalize',
                letterSpacing: 0.8
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
                shadowColor: '#2F5DA8',
                shadowOpacity: 0.5,
                shadowRadius: 8
              }}
          >
            <Text
              style={{ 
                ...style.text,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: 0.8
                 }}
            >
              {`#${id}`}

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
  glow: {
    position: 'absolute',
    top: 60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  groundShadow: {
    position: 'absolute',
    top: 285,
    width: 170,
    height: 22,
    borderRadius: 85,
    backgroundColor: 'rgba(0,0,0,0.22)'
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
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(47,93,168,0.25)',
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
    borderColor: 'white',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  tipoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
});