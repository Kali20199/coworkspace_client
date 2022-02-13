import React, { useCallback } from 'react'
import { View, Text, FlatList } from 'react-native';
import Reservation from '../Widgets/Reservation'
import { Provider } from 'react-native-paper';
import { Work } from '../../constant/Application';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/store';
function ReservationsScreem() {

    const [visable, setVisable] = React.useState(true)
    
    const { UserStore,CoWorkStore } = useStore()
    var SpaceImg = ''
    CoWorkStore.LightSpaceCard.map((Space)=>{
         if(Space.id == UserStore.Reservations.coworkID.toUpperCase()){
            SpaceImg = Space.mainImage
         }
    })
    const MyRenders = useCallback(
        ({ item }) => <Reservation Reservations={UserStore.Reservations} spaceImage={SpaceImg} itemData={item} />

        , [])
    return (
        <Provider>



            <Reservation Reservations={UserStore.Reservations}  spaceImage={SpaceImg} />


            {/* <Text>
                My Reservations
            </Text> */}
        </Provider>
    )
}

export default observer(ReservationsScreem)
