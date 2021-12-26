import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import axios from 'axios'
import { Platform, Alert, View, Text, StyleSheet, ViewStyle, TextStyle, Button, Image } from 'react-native';
import {TextInput} from 'react-native-paper'
import LottieView from 'lottie-react-native'
import Color from '../../constant/Color'
import { ScrollView } from 'react-native-gesture-handler';
import LOGO from '../../assets/LightSpace.png'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
// import axios from 'react-native-axios'
function Login(props) {

  const User = useStore()
  const x = 3
  const baseUrl = 'http://192.168.1.30:5003/api/Account'
  const httpUrl = 'http//localhost:5085/api/Account'

  const [Messgae, setMessage] = useState()
  const { UserStore } = useStore()
  const [showpassword,setShowPassword] = useState(true)



  useEffect(() => {
    // CreateChannel();


    const FetchData = async () => {
      await axios.get(baseUrl).then(res => {
        setMessage(res.data)

        // Alert.alert("Compelete")
      })

        .catch(ex => {
          debugger
        })
    }
    //FetchData()


  }, [])



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
   
    UserStore.Login(Cred)

  }


  return (
    <ScrollView>
      <View style={style.Page}>
        <View style={style.logoview}>
          <LottieView style={style.app} source={require('../../Lottie/3520-light-bulb.json')} autoPlay loop />
          <Image style={style.ImageLogo} source={LOGO} />
        </View>
        <View style={style.container}>  

          <View style={style.passwordContainer}>
            <TextInput right={<TextInput.Icon name="email"  />}  keyboardType='email-address' onChange={handleInput} nativeID='email' placeholder={'Email'} style={style.Input} />
          </View>
          <View style={style.passwordContainer}>     
            <TextInput right={<TextInput.Icon name="eye" onPress={()=>setShowPassword(!showpassword)} />}   onChange={handleInput} secureTextEntry={showpassword} nativeID='password' placeholder={'Password'} style={style.Input} />       
          </View>
          <View style={style.BT}>
            <Button color={Color.primary} onPress={() => { Submit() }} title={'Login'} />
          </View>
          <View style={style.BT}>
            <Button color={Color.accent} onPress={() => { props.navigation.navigate('Register') }} title={'Register'} />
          </View>
          <View style={style.BT}>
            <FBLogin
              onPermissionsMissing={() => {
                FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
                  if (!error) {
                    console.log("Login data: ", data);
                  } else {
                    console.log("Error: ", error);
                  }
                })
                Alert.alert("Logged")
              }}
              onLogin={function (data) { return "" }}
              loginBehavior={FBLoginManager.LoginBehaviors.Native} />

          </View>
        </View>
      </View>
    </ScrollView>

  )
}



export const style = StyleSheet.create({
  Page: {


  },
  app: {

    height: 150,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    zIndex: -1

  },
  container: {
    marginTop: 50,
    justifyContent: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'


  },


  Input: {

    marginTop: 20,
    height: 50,
    borderWidth: 1,
    textAlign: 'center',
 
    alignContent: 'flex-start',
    justifyContent: 'flex-start'




  },
  BT: {

    marginTop: 20
  },

  logoview: {
    marginLeft: 110,
  },

  ImageLogo: {
    width: 150,
    height: 70,
    // position:'absolute',
    // zIndex:1,

    // marginTop:90 
  },

  passwordContainer:{
    
  
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  icon:{
    flexDirection:'row',
    
  },



})

export default observer(Login)
