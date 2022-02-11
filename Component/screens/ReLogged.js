import React, { useEffect } from 'react'
import { View,Button,Text } from 'react-native';

import { useStore } from '../../store/store';
import {ActivityIndicator,Colors,Switch  } from 'react-native-paper';


 
function ReLogged(props) {
const {UserStore:{Logout}} = useStore()  
    useEffect(()=>{
        Logout(props)
    
    },[])

    return (
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:'100%'}}>
            <View>
          <ActivityIndicator animating={true} color={Colors.red800} />
          <Text>Logging Out</Text>
          </View>
        </View>
    )
} 

export default ReLogged