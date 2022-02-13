import React from 'react'
import { Avatar, Button, Dialog, Portal, Provider, Paragraph, Card, Title } from 'react-native-paper';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { observer } from 'mobx-react-lite';
import { ScrollView } from 'react-native-gesture-handler';








function ReservationWidget(props) {
    const { Time, Date, coworkID, coworkName, isConfirmed } = props.Reservations
    const [visable, setVisable] = React.useState(false)
    const CanceDialog = () => {

        return (
            <Portal>
                <Dialog visible={visable} onDismiss={() => setVisable(false)}>
                    <Dialog.Title>Are you Sure You want to Cancel Reservation"</Dialog.Title>
                    <Dialog.Content>
                        <Button onPress={() => {
                            setVisable(false)
                        }} >Confirm</Button>
                        <Button onPress={() => { setVisable(false) }} >Cancel</Button>
                    </Dialog.Content>

                </Dialog>
            </Portal>
        )
    }



    return (




        <View style={style.cardView}>
            <Card style={style.card}>
                <View style={style.mainView}>
                    <Avatar.Image source={{ uri: 'https://images.squarespace-cdn.com/content/v1/57333f3b044262e0b7ab43a3/1591797552694-7FMLLXF7Y6DZ17J2E3C6/4.jpg?format=1000w' }} />
                    <View style={style.veiwInfo}>
                        <Text style={style.name}>
                            {coworkName}
                        </Text>


                        <Text style={{ ...style.name, color: isConfirmed == "False" ? 'red' : 'greem' }}>
                            {isConfirmed == "False" ? "Not Confimed" : "Confirmed"}
                        </Text>
                    </View>
                    <Text style={style.veiwInfo}>
                        {Date}:{Time}
                    </Text>
                    <FontAwesome style={{ marginLeft: 10 }} name='clock' size={20} color={'#000000'} />

                    {CanceDialog()}
                    <Icon onPress={() => {
                        setVisable(!visable)
                    }} style={{ marginLeft: 20 }} name='delete' color={'#FF0000'} />
                </View>
            </Card>
            {visable && <Text>dsfdsfsdf</Text>}
        </View>



    )
}


const style = StyleSheet.create({
    cardView: {
        height: 100,
        padding: 10
    },
    card: {
        padding: 10
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    veiwInfo: {
        marginLeft: 15
    },
    name: {
        fontWeight: '900',


    }
})

export default observer(ReservationWidget)
