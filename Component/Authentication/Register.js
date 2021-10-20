import React from 'react'
import { View,TextInput,StyleSheet,Text,Button } from 'react-native';
import {style} from './Login'
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
function Register() {
 
  const {UserStore} = useStore()

  Register=async(props)=>{
  //  

  //  {debugger}
  }

  let Cred= {
    userName:'Mostafaihab',
    email:'mostafaihab2019@gmail.com',
    password:'Mostafaiahb30$',
    city:'Alexandria',
    phone:'01111309569'

  }

   const handleInput=(event)=>{
   const {nativeEvent} = event
   const Type = event._targetInst.memoizedProps.nativeID
   Cred[Type] = nativeEvent.text
  
  }


  const Submit=()=>{

    
     UserStore.Register(Cred)
    // UserStore.SayHello()
    //UserStore.GetuserToken("mostafaihab2019@gmail.com","Mostafaihab30$")
   
  }

    return (
   
     <View style={style.container}> 
   
     <Text title={'SignUp'}/>
      <TextInput onChange={handleInput} nativeID='userName' placeholder={'UserName'} style={style.Input} />
      <TextInput onChange={handleInput} nativeID='email' placeholder={'Email'} style={style.Input} />
      <TextInput onChange={handleInput} nativeID='password' placeholder={'Password'}   style={style.Input}  />
      <TextInput onChange={handleInput} nativeID='city' placeholder={'City'}   style={style.Input}  />
      <TextInput onChange={handleInput} nativeID='phone' placeholder={'Phone'}   style={style.Input}  />
      <View style={style.BT}>
      <Button onPress={()=>{Submit()}} title={'Signup'}/>
      </View>
    </View>
   
    )
}

export default observer(Register)
