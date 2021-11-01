import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import axios from 'axios'
import { Platform,Alert, View,Text, StyleSheet,ViewStyle,TextStyle,TextInput, Button } from 'react-native';
import LottieView from 'lottie-react-native'
import Color from '../../constant/Color'
import { ScrollView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification'
// import axios from 'react-native-axios'
function Login(props) {

   const User = useStore() 
   const x =3
   const baseUrl = 'http://192.168.1.30:5003/api/Account'
   const httpUrl = 'http//localhost:5085/api/Account'

   const [Messgae,setMessage] = useState()
   const {UserStore} = useStore()


  useEffect(()=>{
   // CreateChannel();
  
 
   const  FetchData =async()=>
  {
      await axios.get(baseUrl).then(res=>{
        setMessage(res.data)
      
       // Alert.alert("Compelete")
      })
      
    .catch( ex=>{     
       debugger
     })
   }
   //FetchData()
   

  },[])



  let Cred= {
    email:'',
    password:'',

  }

   const handleInput=(event)=>{
   const {nativeEvent} = event
   const Type = event._targetInst.memoizedProps.nativeID
   Cred[Type] = nativeEvent.text
  
  }

  const Submit=()=>{
    UserStore.Login(Cred)
   
  }

   
    return (
      <ScrollView>
     <View style={style.Page}>
           <LottieView style={style.app} source={require('../../Lottie/3520-light-bulb.json')} autoPlay loop/>
      <View style={style.container}> 

      <TextInput onChange={handleInput} nativeID='email' placeholder={'Email'} style={style.Input} />
      <TextInput onChange={handleInput} nativeID='password' placeholder={'Password'}   style={style.Input}  />
      <View style={style.BT}>
      <Button color={Color.primary} onPress={()=>{Submit()}} title={'Login'}/>
      </View>
      <View style={style.BT}>
      <Button color={Color.accent} onPress={()=>{props.navigation.navigate('Register')}} title={'Register'}/>
      </View>
    </View>
    </View>
    </ScrollView>
      
    )
}



export const style=StyleSheet.create({
  Page:{

    
  },
  app:{

    height:250,
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    zIndex:-1

},
  container:{
   
    justifyContent:'center',
    width:'70%',
    marginLeft: 'auto',
    marginRight: 'auto'
    
    
  },
  Label:{

  },
 


  Input:{
    paddingTop:20,
    marginTop:20,
    height:50,
    borderWidth: 1,
    textAlign:'center',
    color:'black',
    alignContent:'flex-start',
    justifyContent:'flex-start'
 
   
   
   
  },
  BT:{
  
   marginTop:20
  },

 

})

export default observer(Login)
