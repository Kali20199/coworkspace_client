import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import axios from 'axios'
import { Platform, Alert, View, Text, StyleSheet, ViewStyle, TextStyle, Button, Image } from 'react-native';
import { TextInput } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import Color from '../../constant/Color'
import { ScrollView } from 'react-native-gesture-handler';
import LOGO from '../../assets/LightSpace.png'
import MyButton from '../MyCustomCompnents/MyButton';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { SafeAreaView } from 'react-native-safe-area-context';
// import axios from 'react-native-axios'
function Login(props) {

  const baseUrl = 'http://192.168.1.30:5003/api/Account/CheckAuth'
  const { UserStore } = useStore()
  const [showpassword, setShowPassword] = useState(true)

  const FetchData = async () => {
    await axios.get(baseUrl).then(res => {

      if (UserStore.token != undefined && UserStore.token != null && UserStore.token != "") {
        props.navigation.navigate('Dashboard')
      }
      // Alert.alert("Compelete")
    })

      .catch(ex => {

      })
  }

  useEffect(() => {
    // CreateChannel();



    FetchData()


  }, [])


  const HndleFaceBookUser = (profile,props) => {
    const {token,userId} = profile.credentials
    const User = {
      token:token,
      userId:userId
    } 
    UserStore.FaceBookLogin(User,props)
  


  }


  let Cred = {
    email: '',
    password: '',

  }

  const handleInput = (event) => {
    const { nativeEvent } = event
    const Type = event._targetInst.memoizedProps.nativeID
    Cred[Type] = nativeEvent.text

  }

  const Submit = () => {

    UserStore.Login(Cred, props) 

  }
  return (
    <SafeAreaView style={style.SafeAreaView} edges={['top', 'left', 'right']}>
    <ScrollView>
      <View  style={{...style.Page }}>
        <View style={style.logoview}>
          <View>
            <LottieView style={style.app} source={require('../../Lottie/3520-light-bulb.json')} autoPlay loop />
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Image style={style.ImageLogo} source={LOGO} />
            </View>
          </View>
        </View>
        <View style={style.container}>

          <View style={style.passwordContainer}>
            <TextInput right={<TextInput.Icon name="email" />} keyboardType='email-address' onChange={handleInput} nativeID='email' placeholder={'Email'} style={style.Input} />
          </View>
          <View style={style.passwordContainer}>
            <TextInput right={<TextInput.Icon name="eye" onPress={() => setShowPassword(!showpassword)} />} onChange={handleInput} secureTextEntry={showpassword} nativeID='password' placeholder={'Password'} style={style.Input} />
          </View>
          <View style={style.BT}>
            <MyButton title={"Login"} color={Color.primary} fun={Submit} />
            {/* <Button color={Color.primary} onPress={() => { Submit() }} title={'Login'} /> */}
          </View>
          <View style={style.BT}>
          <MyButton title={"Register"} color={Color.accent} fun={()=>props.navigation.navigate('Register')} />
        
          </View>
          <View style={style.BT}>
            {/* <FBLogin style={{ marginBottom: 10, }}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              permissions={["email", "user_friends"]}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              onLogin={function (data) {
                console.log("Logged in!");
                console.log(data);
                HndleFaceBookUser(data,props)
              }}
              onLogout={function () {
                console.log("Logged out.");

              }}
              onLoginFound={function (data) {
                // Change Later if User Found go to Dashboard Immediatly with token  no 
                // Need To Connect to BackEnd use Your Token
             

              }}
              onLoginNotFound={function () {
                console.log("No user logged in.");
              
              }}
              onError={function (data) {
                console.log("ERROR");
                console.log(data);
              }}
              onCancel={function () {
                console.log("User cancelled.");
              }}
              onPermissionsMissing={function (data) {
                console.log("Check permissions!");
                console.log(data);
              }}
            /> */}

          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
   

  )
}



export const style = StyleSheet.create({
  Page: {


  },
  sfaarea:{
    flex: 1,
     justifyContent: 'space-between',
     alignItems: 'center' 
  },


  app: {

    height: 200,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    zIndex: -1

  },
  container: {
    marginTop: 200,
    justifyContent: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'


  },


  Input: {

    marginTop: 20,
    height: 50,
   
    textAlign: 'center',

   




  },
  BT: {

    marginTop: 20,
    borderRadius:50
  },

  logoview: {
    flexDirection:'row',
    height:100,
   justifyContent:'center'
  },

  ImageLogo: {
    width: 150,
    height: 70,
    // position:'absolute',
    // zIndex:1,

    // marginTop:90 
  },

  passwordContainer: {



   
    paddingBottom: 10,
  },
  icon: {
    flexDirection: 'row',

  },



})

export default observer(Login)
