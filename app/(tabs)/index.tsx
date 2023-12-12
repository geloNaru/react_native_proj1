import { StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Button, Text, View } from '../../components/Themed';
import { useFonts } from 'expo-font';

export default function TabOneScreen() {
  const [fontsLoaded] = useFonts({
    BakbakOne: require("../../assets/fonts/BakbakOne.ttf"),
    Raleway: require("../../assets/fonts/Raleway.ttf"),
    RalewayItalic: require("../../assets/fonts/Raleway_Italic.ttf"),
    RalewayItalicSemibold: require("../../assets/fonts/Raleway_Italic_SemiBold.ttf"),
    RalewaySemibold: require("../../assets/fonts/Raleway_SemiBold.ttf")
  });
  if(!fontsLoaded) return (<AppLoading />);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>LIFELINE</Text>
      <Text style={styles.def}>Blood Bank Management System</Text>
      <Button style={styles.register} title="Register" onPress={() => {}} textStyle={{fontSize: 20, color: 'white', alignSelf: 'center'}} />
      <Text style={styles.member}>Already have an account?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 180,
    height: 180,
  },
  register:{
    backgroundColor: '#FF000F',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    marginTop: 200,
    width: 237,
    height: 50,
    
  },
  title: {
    fontSize: 60,
    color: 'red',
    fontFamily: 'BakbakOne'
  },
  def: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'RalewaySemibold'
  },
  member:{
    marginTop: 20, 
    fontSize: 20, 
    color: 'black', 
    fontFamily: 'RalewayItalicSemibold', 
    textDecorationLine: 'underline'}
});
