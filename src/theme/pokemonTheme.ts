import {StyleSheet, Dimensions} from "react-native";

export const pokemonTheme = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  contima: {
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 5
  
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  abilityContainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft: 5
  },
  abilityTag: {
  	paddingHorizontal: 16,
  	paddingVertical: 6,
  	borderRadius: 20,
  	marginRight: 8,
  	marginBottom: 8
},
  abilityText: {
  	color: 'white',
  	fontWeight: 'bold',
  	textTransform: 'capitalize'
},
  picture: {
    width: 120,
    height: 120
  },
  infocard: {
    width: '48%',
    marginHorizontal: '1%',
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 17,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 4,
  },
  containeritems: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  imagecard: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 5,
    padding: 8,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 5
  },
  statRow:{
    marginVertical: 6,
    marginHorizontal: 5
  },

  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 3
  },

  barBackground:{
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow:'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: 6
  }
});