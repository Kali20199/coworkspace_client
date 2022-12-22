import { View, StyleSheet, Button, FlatList, Text, Image, Alert, TouchableOpacity } from 'react-native';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import React, { useState } from 'react'
import { Paragraph, Button as BTs } from 'react-native-paper';
import DATE from '../../assets/date.png'
import TIMEADD from '../../assets/time.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../../store/store';
import MyButton from './../MyCustomCompnents/MyButton';
import Color from '../../constant/Color';
import globalstyle from '../GlobalStyle';
import RESERVED from '../../assets/Reserved.jpg'
function SwipeModal(props) {




  let [animateModal, setanimateModal] = useState(false);
  const [show, setShow] = useState(false);
  const { CoWorkStore, UserStore, Hub } = useStore()
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



  const ConfrimReservation = () => {
    if (DateRaserved !== null && TimeReserved !== null) {
      Alert.alert("Reserve Requested", `${DateRaserved} :  ${TimeReserved}`)
      props.HubCon.Invoke("Reservations", Reservation(DateRaserved + ":" + TimeReserved
      ))

      var ReservationModel = {

        Time: TimeReserved,
        Date: DateRaserved,
        coworkID: CoWorkStore.workSpaces.coworkSpaceId,
        coworkName: CoWorkStore.workSpaces.name,
        isConfirmed: "False"
      }
      UserStore.AddReservation(ReservationModel)
      setVisible(false)
    } else {
      Alert.alert("Please Select both Date and Time")
    }
    props.setSwipeModal(false)

  }

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


  const showDatePicker = () => {
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

            <View style={styles.header}>
              <Image style={{ width: '100%', height: 180 }} resizeMode='cover' source={RESERVED} />
              <Paragraph style={{ padding:30, color: 'black' }}>Please Choos Time Reservation From DatePicker</Paragraph>
            </View>
            <View style={styles.body}>

              <View style={globalstyle.cardView}>
                <TouchableOpacity onPress={showTimepicker}  >
                  <View style={styles.pickerView} >
                    <Image style={{ height: 25 }} source={TIMEADD} color='black' />
                    <Text style={styles.text}>Pick A Time</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={globalstyle.cardView}>
                <TouchableOpacity onPress={showDatepicker} >

                  <View style={styles.pickerView} >
                    <Image style={{ height: 25 }} source={DATE} color='red' />
                    <Text style={styles.text}>  Pick A date</Text>
                  </View>



                </TouchableOpacity>
              </View>

              {showDatePicker()}
            </View>

            <View style={{ marginBottom:10,marginTop: 50 }}>
              <MyButton

                color={Color.primary}
                title={"Confirm"}
                fun={ConfrimReservation}
              />
            </View>
          </View>
        }
        HeaderStyle={styles.headerContent}
        ContentModalStyle={styles.Modal}
        HeaderContent={
          <View style={styles.containerHeader}>

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

    marginTop:40


  },

  body: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30

  },
  header: {
    justifyContent: 'space-between',
    height: 250,
  },
  pickerView: {

    padding: 15,
    height: 100,
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.primary

  },
  containerHeader: {


    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 150,
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