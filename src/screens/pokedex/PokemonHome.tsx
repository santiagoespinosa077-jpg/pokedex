import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { usePokemonPaginated } from '../../hooks/usePokemonPaginated';
import { PokemonCard } from '../../components/pokemonCard';

export const PokemonHome = () => {

  const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

  return(
    <View
      style={ appTheme.container }
    >
      <Image
        style={{
          width: 380,
          height: 800,
          position: 'absolute',
          opacity: 0.77
        }}
        source={ require('./../../../assets/Van.jpg') }
      />
        
      
      <FlatList
        data={ simplePokemonList }
        keyExtractor={ (pokemon, index) => `${pokemon.id}${index}` }
        ListHeaderComponent={(
          <View
            style={{
              ...appTheme.container,
            }}
          >

          <Image
            style={{
            width: 300,
            height: 100,
            opacity: 0.9,
            top: 10,
            marginBottom: 20 

              }}
            source={ require('./../../../assets/pk.png') }
            />
            
          </View>
        )}
        numColumns={2}
        renderItem={ ({item}) => (
          <PokemonCard
            pokemon={item}
          /> 
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={ loadPokemons }
        onEndReachedThreshold={ 0.2 }
        ListFooterComponent={(
          <ActivityIndicator
            style={{ height: 120 }}
            size={ 50 }
            color="pink"
          />
        )}
      />
    </View>
  );
}