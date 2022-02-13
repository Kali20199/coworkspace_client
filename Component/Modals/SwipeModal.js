import { View, StyleSheet, Button, FlatList, Text, Image, Alert } from 'react-native';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import React, { useState } from 'react'
import { Paragraph, Button as BTs } from 'react-native-paper';
import DATE from '../../assets/date.png'
import TIMEADD from '../../assets/time.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../../store/store';


function SwipeModal(props) {




    let [animateModal, setanimateModal] = useState(false);
    const [show, setShow] = useState(false);
    const { CoWorkStore, UserStore,Hub} = useStore()
    const [mode, setMode] = useState('date');
    const [DateRaserved, SetDateRaserved] = useState(null)
    const [TimeReserved, SetTimeReserved] = useState(null)
    const [visible, setVisible] = React.useState(false);
    const date = new Date();

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    
      };
    
      const showDatepicker = () => {
          const Show = show
        showMode('date');
    
    
      };
    
      const showTimepicker = (event) => { 
        showMode('time');
      
      
      };

      const Reservation = (Date) => {

        let model = {
    
          Email: UserStore.email,
          CoworkSpaceid: CoWorkStore.workSpaces.coworkSpaceId,
          UserName: 'NotSet',
          TimeReservd: Date
    
        }
    
        return model
      }
    


      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const Calenders = currentDate.toString().split(" ")
        setShow(false)
    
        if (mode == 'date') {
          const Date = Calenders[0] + '/' + Calenders[1] + '/' + Calenders[2]
          SetDateRaserved(Date)
        } else {
          const Time = currentDate.toString().split(" ")[4]
          SetTimeReserved(Time)
        }
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    
      };
    

      const showDatePicker=()=>{
          return (
            
                <>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
            
              )}
                  </>
          )
      }
      

    return ( 
        <View>
            <SwipeUpDownModal
                modalVisible={props.swipeModal}
                PressToanimate={animateModal}
                //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
                ContentModal={

                    <View style={styles.containerContent}>

                        <Paragraph style={{ color: 'black' }}>Please Choos Time Reservation From DatePicker</Paragraph>
                        <BTs onPress={showTimepicker}  >  
                        <Text>pick A Time</Text>
                            <Image style={{ height: 20 }} source={TIMEADD} color='black' />
                        </BTs>
                        <BTs color={'red'} onPress={showDatepicker} >
                            Pick A date
                            <Image source={DATE} size={12} color='green' />

                        </BTs>

                      {showDatePicker()}
                    </View>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View style={styles.containerHeader}>
                        <Button
                            title={"Confirm"}
                            onPress={() => {
                                if (DateRaserved !== null && TimeReserved !== null) {
                                    Alert.alert("Reserve Requested", `${DateRaserved} :  ${TimeReserved}`)
                                   props.HubCon.Invoke("Reservations", Reservation(DateRaserved +":"+ TimeReserved
                                      ))

                                      var ReservationModel = {
                                        
                                        Time:TimeReserved,
                                        Date:DateRaserved,
                                        coworkID:CoWorkStore.workSpaces.coworkSpaceId,
                                        coworkName:CoWorkStore.workSpaces.name,
                                        isConfirmed:"False"
                                      }
                                      UserStore.AddReservation(ReservationModel)
                                    setVisible(false) 
                                  } else {
                                    Alert.alert("Please Select both Date and Time")
                                  }
                                  props.setSwipeModal(false)
                                // setShow(false)
                               
                                // setanimateModal(true);
                            }}
                        />
                    </View>
                }
                onClose={() => {
                    props.setSwipeModal(false);
                    setanimateModal(false);
                }}
            />

        </View>
    )
}

export default SwipeModal




const styles = StyleSheet.create({
    containerContent: {
        height: 150,
        marginTop: 40,
        backgroundColor: '#ffffffed'
    },
    containerHeader: {

        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#ffffff',
    },
    headerContent: {
        marginTop: 0,
    },
    Modal: {
        height: 150,
        backgroundColor: '#ffffff',
        marginTop: 0,
    }
});