import React from 'react'
import { View,StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'
function LightSplashScreen() {
    return (
        <View style={style.container}>
               <LottieView style={style.app} source={require('../../Lottie/3520-light-bulb.json')} autoPlay loop/>
        </View>
    )
}






const style = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    
    },
})




export default LightSplashScreen
