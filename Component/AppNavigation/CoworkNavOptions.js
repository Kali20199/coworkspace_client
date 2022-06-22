import Color from "../../constant/Color"
import React from "react";
import { StyleSheet, Text, View, Animated ,TouchableOpacity,SafeAreaView} from 'react-native';
import { observer } from 'mobx-react-lite';
import { enableScreens } from 'react-native-screens';
import Register from '../../Component/Authentication/Register'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'
import DrawerIcons from 'react-native-vector-icons/Feather'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoogleMap from '../../Component/GoogleService/GoogleMap';
import Login from '../../Component/Authentication/Login';
import { App_Name } from '../../constant/Application';
import WorkSpaceListView from '../screens/WorkSpaceListView';
import { useStore } from "../../store/store";
import WorkSpaceDetails from './../screens/WorkSpaceDetails';
import AppSettings from '../Settings/AppSettings';
import MyProfile from '../Settings/MyProfile';
import ReservationsScreem from '../screens/ReservationsScreem';
import ReLogged from '../screens/ReLogged';
import { useEffect } from "react";
import { Provider } from 'react-native-paper'
import Dialogs from './../Widgets/Dialogs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'


enableScreens()

const Drawer = createDrawerNavigator()
const Stack = createSharedElementStackNavigator()
const Tab = createBottomTabNavigator();

 // animation
const scalingInit = new Animated.Value(0)
const scaling = scalingInit.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 4]
})





const TabbarButton = ({ icon, focused }) => {

  return (
    <Animated.View>

      <MaterialCommunityIcons name={icon} size={focused? 29 : 23} 
        color={focused ? Color.primary : 'black'} />
      
    </Animated.View>
)
}


export const HeaderBase = (Title, icon) => {

  const Header = {

    headerTintColor: 'white',
    headerStyle: { backgroundColor: Color.primary },


    headerCenter: () => <Text style={style.Text}>{Title}</Text>,
    tabBarIcon: ({ color, focused }) => <TabbarButton focused={focused} icon={icon} />,
    headerTitle: () => <Text style={style.Text}>{Title}</Text>,
    drawerIcon: () => <DrawerIcons name={icon} size={23} color='black' />
  }
  return Header
}
const x = "dfsdfsdf"


function NavDrawer(props) {
  return (
    <Drawer.Navigator initialRouteName="CoworkSpaces" >
      <Drawer.Screen name="MyProfile" component={MyProfile} options={{ ...HeaderBase("MyProfile", "user") }} />
      <Drawer.Screen name="App Setting" component={AppSettings} options={HeaderBase("App Setting", "settings")} />
      <Drawer.Screen name="Logout" component={ReLogged} options={{ ...HeaderBase("Logout", "log-out"), headerShown: false }} />
      <Drawer.Screen name="All_Rreservations" component={ReservationsScreem} options={HeaderBase("My Reservations", "biscuit-clock")} />
    </Drawer.Navigator>
  )
}



//tabBarBadge: 3


function BtoomNav() {

  // Ohter Screen When Login
  return (
    <Tab.Navigator
      screenOptions={{

        tabBarStyle: {
          height: 55,
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 20
        }
      }}

    >

      <Tab.Screen name={App_Name} component={WorkSpaceListView} options={{ headerShown: true, ...HeaderBase(App_Name, "dashboard") }} />
      <Tab.Screen name="Map" component={GoogleMap} options={{ headerShown: false, ...HeaderBase("Map", "map") }} />
      <Tab.Screen name="Settings" component={NavDrawer} options={{ headerShown: false, valueOf, ...HeaderBase("Settings", "settings") }} />
    </Tab.Navigator>
  );
}



const CoworkNav = (props) => {
  const { CoWorkStore, UserStore, Hub } = useStore()


  useEffect(() => {
    Hub.StartHubConnection()
  }, [])

  return (
    
    <Provider>
      <Dialogs />
     
      <Stack.Navigator >

        <Stack.Screen name="Login" component={Login} options={{headerShown:false,...HeaderBase("Login")}} />
        <Stack.Screen name="Dashboard" component={BtoomNav} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ ...HeaderBase("Register") }} />
        <Stack.Screen name={'Ink'} component={WorkSpaceDetails} options={{ ...HeaderBase(CoWorkStore.name) }} />
        <Stack.Screen name="New1" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New2" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New3" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New4" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New5" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New6" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="New7" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    
    </Provider>
 

  )
}


const style = StyleSheet.create({

  Text: {
    color: 'white',
    fontSize: 20,
  },
})

export default observer(CoworkNav)