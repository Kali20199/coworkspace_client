/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 
 import {NavigationContainer} from '@react-navigation/native'
import React from 'react';
import CoworkNav from './Component/AppNavigation/CoworkNavOptions';
import { observer } from 'mobx-react-lite';


const App = () => {


 

  return (
 
    <NavigationContainer >
    <CoworkNav/>
  
    </NavigationContainer> 
  );
};


export default observer(App);
