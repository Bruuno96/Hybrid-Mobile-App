import React from 'react';
import {ActivityIndicator, Platform, StatusBar, View, StyleSheet, Text, ImageBackground } from 'react-native';

import SearchInput from'./components/SearchInput';

import getImage from './utils/ImagesForWeather';

import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
    loading:false,
    error: false,
    location:'',
    temperature: 0,
    weather:'',
  }
}

//Método que diz que o componente ja foi montado e atualizado.
componentDidMount(){
  this.handleUpdateLocation('San Fracisco');
}

handleUpdateLocation = city => {
  if (!city) return;

  this.setState({ loading : true }, async () => {
    try{
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationId);
      this.setState({
        loading : false,
        error: false,
        location,
        weather,
        temperature,
        
      });
    } catch (e){
      this.setState({ loading: false, error: true});
      console.log(e)
    }
  });
}

  render(){
    const { loading, error, location, weather, temperature } = this.state;
    return(
      <View style={styles.container}>
        <ImageBackground
            source={getImage('Clear')}
            style={styles.imageContainer}
            imageStyle={styles.imagem}
        >
          <View style={styles.detailsContainer}>
           <ActivityIndicator animating = {loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style = {[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try again another city.
                  </Text>

                )}
	
                {!error &&(
                  <View>
                  <Text style = {[styles.smallText, styles.textStyle]}>{location}</Text>
                  <Text style = {[styles.largeText, styles.textStyle]}>{weather}</Text>
                  <Text style = {[styles.smallText, styles.textStyle]}>
                    {`${Math.round(temperature)}º`}
                  </Text>
                  </View>
                  
                )}
                <SearchInput 
              placeholder="Serch any city"
              onSubmit = {this.handleUpdateLocation}
              /> 
              </View>
            )}            
          </View>
        </ImageBackground>
        <StatusBar style= "auto"/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  imageContainer:{
    flex: 1
  },
  imagem:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  detailsContainer:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  textStyle:{
    textAlign:'center',
    fontFamily: Platform.OS == 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText :{
    fontSize : 44,
  },
  smallText:{
    fontSize: 18,
  }, 
  textInput:{
    backgroundColor:'#666',
    color: 'white',
    height: 40,
    width:300,
    marginTop:20,
    marginHorizontal : 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  }
})