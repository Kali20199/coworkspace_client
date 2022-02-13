import React, { useEffect } from 'react'

import { View } from 'react-native';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
function HndleConnectionsOnStart() {
 const {Hub,UserStore} = useStore()
    useEffect(()=>{

        if (UserStore.Reservations == null) {
     
        } else {
            /// Add User on Group to with groupName coworkId to Listen On Accept or Reject Fro Server
          
    
            const AcceptensModel = {
                email: UserStore.email,
                coworkId: UserStore.Reservations.coworkID
    
            }
            Hub.Invoke("joinGroupAcceptence", AcceptensModel) 
      
        
    
            
    
                
    
        }
    

    },[])

  return (
    <View>

    </View>
  )
}

export default observer(HndleConnectionsOnStart)