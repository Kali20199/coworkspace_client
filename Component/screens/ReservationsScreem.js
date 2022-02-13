import React, { useCallback } from 'react'
import { View, Text, FlatList,StyleSheet,Dimensions } from 'react-native';
import Reservation from '../Widgets/Reservation'
import { Provider } from 'react-native-paper';
import { Work } from '../../constant/Application';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/store';

const Height = Dimensions.get('window').height;

function ReservationsScreem() {

    const [visable, setVisable] = React.useState(true)
  
    const { UserStore,CoWorkStore } = useStore()
    var SpaceImg = ''
    if( UserStore.Reservations!=null){
    CoWorkStore.LightSpaceCard.map((Space)=>{
         if(Space.id == UserStore.Reservations.coworkID.toUpperCase()){
            SpaceImg = Space.mainImage
         }
    })
}
    // const MyRenders = useCallback(
    //     ({ item }) => <Reservation Reservations={UserStore.Reservations} spaceImage={SpaceImg} itemData={item} />

    //     , [])
    return (
        <Provider>

        {UserStore.Reservations ?

            <Reservation Reservations={UserStore.Reservations}  spaceImage={SpaceImg} />


         
        : <View style={style.view}>
             <Text style={style.Message}>No Reservations Made</Text>
        </View>    }
        </Provider> 
    )
}



const style = StyleSheet.create({
    view:{
    height:Height-150,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center'
    },
    Message:{
        color:'red'

    }
})

export default observer(ReservationsScreem)
