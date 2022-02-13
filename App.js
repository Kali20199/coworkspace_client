import {NavigationContainer} from '@react-navigation/native'
import React, { useEffect } from 'react';
import CoworkNav from './Component/AppNavigation/CoworkNavOptions';
import { observer } from 'mobx-react-lite';
import SplashScreen from  "react-native-splash-screen";
import LightSplashScreen  from './Component/screens/LightSplashScreen';
import { useStore } from './store/store';
import   Dialogs from './Component/Widgets/Dialogs'
import {Provider} from 'react-native-paper'
const App = () => {

 const {UserStore} = useStore()


 const FetchUser=async()=>{
  await UserStore.GetUserEmail() 
  await UserStore.GetPersitntToken()
 }

useEffect(async()=>{

  FetchUser()
  SplashScreen.hide()
 
 

  // Check User Auth Later on

  // get user  

},[])  
  

  return (
 
    <NavigationContainer >
  
      
    <CoworkNav/>
   
    </NavigationContainer> 
  );
};


export default observer(App);
  