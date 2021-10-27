import Color from "../../constant/Color"
import React from "react"
import {StyleSheet,Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import { enableScreens } from 'react-native-screens';
import Register from '../../Component/Authentication/Register'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoogleMap from '../../Component/GoogleService/GoogleMap'
import Login from '../../Component/Authentication/Login'
import {App_Name} from '../../constant/Application'
import WorkSpacemene from './../screens/WorkSpacemene';

enableScreens()

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


 export  const   HeaderBase=(Title,icon)=>{
    
   const Header={
     
    headerTintColor: 'white',
    headerStyle: { backgroundColor: Color.tomato },
    headerCenter:()=><Text  style={style.Text}>{Title}</Text>,
    tabBarIcon: ()=> <Ionicons name={icon} size={20} color={'gray'} />
 }
return Header
}



function NavDrawer(){
    return(
    <Drawer.Navigator initialRouteName="CoworkSpaces" >
        <Drawer.Screen name="CoworkSpace" component={Register}   options={HeaderBase("","person-add-outline") }/>
      <Drawer.Screen name="Setting" component={Register}   options={HeaderBase("","person-add-outline") }/>
      <Drawer.Screen name="GoogleMap" component={GoogleMap}  options={HeaderBase("","person-add-outline") } />
      
      
    </Drawer.Navigator>
    )
    }

function BtoomNav() {

    // Ohter Screen When Login
    return (
      <Tab.Navigator  >
     
         <Tab.Screen   name={App_Name} component={WorkSpacemene}  options={HeaderBase("","person-add-outline"),{headerShown:true}}  />

        <Tab.Screen    name="Map" component={GoogleMap}   options={{ tabBarBadge: 3,...HeaderBase("sss","map-outline") }} />
        <Tab.Screen name="Settings" component={NavDrawer}  options={HeaderBase("s","home"),{headerShown:false}}  />
  
      </Tab.Navigator>
    );
  }
  


const CoworkNav=()=>
{
   
    return (
     
    
        <Stack.Navigator >
      <Stack.Screen name="Login"  component={Login} options={HeaderBase("Login")}/>
    <Stack.Screen name="Register" component={BtoomNav} options={{ headerShown: false }} />
      </Stack.Navigator>
    
    )
}




const style = StyleSheet.create({

    Text:{
      color:'white',
      fontSize:20,
    },
})

export default observer(CoworkNav)