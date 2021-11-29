import Color from "../../constant/Color"
import React from "react"
import {StyleSheet,Text} from 'react-native'
import { observer } from 'mobx-react-lite';
import { enableScreens } from 'react-native-screens';
import Register from '../../Component/Authentication/Register'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoogleMap from '../../Component/GoogleService/GoogleMap'
import Login from '../../Component/Authentication/Login'
import {App_Name} from '../../constant/Application'
import WorkSpaceList from '../screens/WorkSpaceList';
import { useStore } from "../../store/store";
import { mdiAccountCircle } from '@mdi/js';
import WorkSpaceDetails from './../screens/WorkSpaceDetails';
import AppSettings from  '../Settings/AppSettings'
import MyProfile from  '../Settings/MyProfile'
enableScreens()

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


 export  const   HeaderBase=(Title,icon)=>{
    
   const Header={
     
    headerTintColor: 'white',
    headerStyle: { backgroundColor: Color.tomato },
    headerCenter:()=><Text  style={style.Text}>{Title}</Text>,
    tabBarIcon: ()=> <MaterialCommunityIcons  name={icon} size={20} color='black' />,
    headerTitle:()=><Text  style={style.Text}>{Title}</Text>,
    drawerIcon:()=> <MaterialCommunityIcons  name={icon} size={20}  color='black'/> 
 }
return Header
}



function NavDrawer(){
    return(
    <Drawer.Navigator initialRouteName="CoworkSpaces" >
     
        <Drawer.Screen name="MyProfile" component={MyProfile}   options={HeaderBase("","user")}/>
      <Drawer.Screen name="App Setting" component={AppSettings}   options={HeaderBase("","log-out") }/>
      <Drawer.Screen name="Logout" component={GoogleMap}  options={HeaderBase("","settings") } />
      
      
    </Drawer.Navigator>
    )
    }






function BtoomNav() {

    // Ohter Screen When Login
    return (
      <Tab.Navigator  >  
         <Tab.Screen   name={App_Name} component={WorkSpaceList}  options={{headerShown:true  ,...HeaderBase(App_Name,"home") } }  />
        <Tab.Screen    name="Map" component={GoogleMap}   options={{ ...HeaderBase("Map","map") }} />
        <Tab.Screen name="Settings" component={NavDrawer}  options={{headerShown:false,tabBarBadge: 3,valueOf,...HeaderBase("Settings","settings")}}  />
       
      </Tab.Navigator>
    );
  }
  


const CoworkNav=()=>
{
  const {CoWorkStore} = useStore()
    return (
     
    
        <Stack.Navigator >
      <Stack.Screen name="Login"  component={Login} options={HeaderBase("Login")}/>
    <Stack.Screen name="Register" component={BtoomNav} options={{ headerShown: false }} />

     {/* All Other Application Shared Screen Screen */}

    <Stack.Screen name={'Ink'} component={WorkSpaceDetails}  options={HeaderBase(CoWorkStore.name)}/>



    <Stack.Screen name="New1" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New2" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New3" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New4" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New5" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New6" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="New7" component={Register} options={{ headerShown: false }} />
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