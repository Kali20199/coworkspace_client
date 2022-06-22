import React,{useState } from 'react'
import { Avatar, Button, Dialog, Portal, Provider, Paragraph, Card, Title } from 'react-native-paper';
import { View ,Text,Image,StyleSheet} from 'react-native';

import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import Accept from '../../assets/Accept2.png'

function Dialogs(props) {

    const [modalVisible, setModalVisible] = useState(false);
const [visable, setVisable] = React.useState(true)
const {InfoStore,UserStore} = useStore()
    return (    
     
        <Portal>
            {UserStore?.Reservations?
        <Dialog visible={InfoStore.AcceptDialog} onDismiss={() => InfoStore.setAcceptDialog(false)}>
            <View style={style.header}>
            <Image source={Accept} style={style.img}/>
            <Dialog.Title>Reservation Accepted"</Dialog.Title>
            </View>
            <Dialog.Content>
              <View style={style.body}>
                  <View>
                  <Text style={style.cowork}>
                   CoWork Space :  {UserStore.Reservations.coworkName}
                  </Text>

                  <Text style={style.time}>
                   Time :  {UserStore.Reservations.Time}
                  </Text>

                  <Text style={style.warn}>
                   Dont Forget 
                  </Text>
                  </View>
              </View>
                <Button onPress={() => { 
                    InfoStore.setAcceptDialog(false) }} >Ok</Button>
            </Dialog.Content>

        </Dialog> : null}
    </Portal>


  
      );
    };


    const style = StyleSheet.create({
        img:{
            width:60, 
            height:50,
        
        },
        header:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
  
        },
        body:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            padding:20
        },
        cowork:{
            color:'blue',
            fontSize: 15
        },
        time:{
            color:'green',
            fontSize: 15
        },


        warn:{
        color:'red',
        fontSize: 15
        }
    })

export default observer(Dialogs)