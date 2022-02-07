import React, { useCallback } from 'react'
import { View,Text,FlatList } from 'react-native';
import Reservation from  '../Widgets/Reservation'
import { Provider} from 'react-native-paper';
import { Work } from '../../constant/Application';
import { observer } from 'mobx-react-lite';
function ReservationsScreem() {

    const [visable, setVisable] = React.useState(true)
    const Reservations= Work;
  
    const MyRenders = useCallback(
        ({item}) => <Reservation Reservations={Reservations} itemData={item}/>
    ,[])
    return (
        <Provider>
 
          

            <FlatList data={Reservations} renderItem={ MyRenders}/>
          

            {/* <Text>
                My Reservations
            </Text> */} 
        </Provider> 
    )
}

export default observer(ReservationsScreem)
