import {NavigationContainer} from '@react-navigation/native'
import React, { useEffect } from 'react';
import CoworkNav from './Component/AppNavigation/CoworkNavOptions';
import { observer } from 'mobx-react-lite';
import SplashScreen from  "react-native-splash-screen";
import LightSplashScreen  from './Component/screens/LightSplashScreen';

const App = () => {

useEffect(()=>{
  SplashScreen.hide()

},[])
 

  return (
 
    <NavigationContainer >
    <CoworkNav/>
  
    </NavigationContainer> 
  );
};


export default observer(App);
