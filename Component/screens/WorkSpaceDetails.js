import { View, Text, StyleSheet, Image, Button, Alert, Animated, Easing, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/store'
import Color from '../../constant/Color'
import PushNotification from 'react-native-push-notification'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Work } from '../../constant/Application';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
import Iconics from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Modal, Portal, Button as BTs, Provider, Dialog, Paragraph } from 'react-native-paper';
import { Card, Button as Buttons, Icon } from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import TIMEADD from '../../assets/time.png'
import DATE from '../../assets/date.png'

const windowWidth = Dimensions.get('window').width;
function WorkSpaceDetails(props) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const scalingInit = new Animated.Value(0)
  const scaling = scalingInit.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4]
  })
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [TimeReserved, SetTimeReserved] = useState(null)
  const [DateRaserved, SetDateRaserved] = useState(null)



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);

  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');


  };

  const showTimepicker = (event) => {
    showMode('time');
    const c = event
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const Calenders = currentDate.toString().split(" ")
    
   
    if(mode=='date'){
      const Date = Calenders[0]+'/'+Calenders[1]+'/'+Calenders[2]
      SetDateRaserved(Date)
    }else{
    const Time = currentDate.toString().split(" ")[4]
    SetTimeReserved(Time)
    }
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

  };

  const ReservarionModal = () => {
    const date = new Date();
    // const Now = moment(date).format('YYYY-MM-DD')


    return (
      <Portal>
        <Dialog style={{ backgroundColor: 'white' }} visible={visible} onDismiss={hideModal}>
          <Dialog.Title style={{ color: 'black' }}>Pick up Date</Dialog.Title>
          <Dialog.Content >
            <Paragraph style={{ color: 'black' }}>Request Permission Access Local Storage</Paragraph>
            <BTs onPress={showTimepicker}  >
              pick A Time
              <Text>
                <Image style={{ height: 20 }} source={TIMEADD} color='black' />
              </Text>
            </BTs>
            <BTs color={'red'} onPress={showDatepicker} >
              Pick A date
              <Image source={DATE} size={12} color='green' />

            </BTs>

            {show && (
              <>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <BTs onPress={() => {
              if(DateRaserved!==null && TimeReserved!==null){
                 Alert.alert("Reserve Requested", `${DateRaserved} :  ${TimeReserved}`)
                 setVisible(false)
              }else{
                Alert.alert("Please Select both Date and Time")
              }
    
            }}>Confirm</BTs>
            <BTs onPress={() => setVisible(false)}>Cancel</BTs>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    )
  }


  const WorkSpaceImage = (props) => {

    return (
      <View style={{ marginLeft: 20 }}>

        <Image style={{ height: 150, width: 200 }} source={{ uri: props.img }} />
      </View>
    )
  }





  const CreateChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Chnnel"
      }, () => {
        PushNotification.localNotification({
          channelId: "",
          title: "Loght Space",
          message: 'Reserved Succssefully',

        })
      },
    )
  }

  useEffect(() => {
    Animated.timing(scalingInit, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start()


    CreateChannel()
  })





  const { CoWorkStore, UserStore } = useStore()
  const pan = React.useRef(new Animated.ValueXY()).current;
  const Detail = CoWorkStore

  return (
    <ScrollView style={style.view}>
      <Provider>
        <View>
          <View>

            <Animated.Image style={{ opacity: scalingInit, ...style.image }} source={{ uri: Detail.imageurl }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', ...style.Container }}>
            <View>
              <Text style={[style.text, style.name, style.cards]}>
                {Detail.name}
              </Text>


              <Animated.Text style={[style.text, style.cards]}>
                Free Tables xx: {Detail.tables}
              </Animated.Text>


              <Animated.Text style={[style.text, style.cards]}>
                .    city : {Detail.city}
              </Animated.Text>

              <Text style={[style.info]}>
                Space Info
              </Text>


              <Text style={[style.moreinfo]}>
                <MaterialCommunityIcons name={'phone'} size={20} color='green' />
                .     phone : 01111309569
              </Text>

              <Text style={[style.moreinfo]}>
                <MaterialCommunityIcons name={'users'} size={20} color='blue' />
                .     Owner : Mostafa ihab
              </Text>
              <Text style={[style.moreinfo]}>
                <MaterialCommunityIcons name={'clock'} size={20} color='green' />
                .     Time Open : 8:30 AM
              </Text>
              <Text style={[style.moreinfo]}>
                <FontAwesome5 name={"window-close"} size={20} color='red' />
                .    Time Close : 10 PM
              </Text>


              <Text style={[style.moreinfo]}>
                <FontAwesome5 name={"table"} size={20} color='brown' />
                .     Tables : 12
              </Text>

              <Text style={[style.moreinfo]}>
                <FontAwesome5 name={"person-booth"} size={20} color='green' />
                .     Private Rooms : 5
              </Text>

              <Text style={[style.moreinfo]}>
                <FontAwesome5 name={"coins"} size={20} color='yellow' />
                .     TablePrice : 20 EGP
              </Text>

              <Text style={[style.moreinfo]}>
                <View style={{ marginLeft: 20 }}>
                  <FontAwesome5 name={"coins"} size={20} color='#490e5d' />
                </View>
                .    PrivateRoomPerHoure : 50 EGB - 100 EGP
              </Text>

              <Text style={[style.info]}>
                Notes :
              </Text>
              <Text style={[style.moreinfo]}>
                Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using
              </Text>





              <Card>
                <Card.Title>Space View</Card.Title>
                <FlatList horizontal data={Work} renderItem={item => <WorkSpaceImage img={item.item.imageurl} />} />

              </Card>

            </View>
          </View>
          {ReservarionModal()}
          <View style={style.button}>
            <Button onPress={() => {


              // Notifi()
              showModal()



              PushNotification.localNotification({
                channelId: "test-channel",
                title: "Light Space",
                message: 'Reserved Succssefully',
              

              })
           
            }} color={Color.primary} title={'Reserve Now'} />
          </View>
        </View>
      </Provider>
    </ScrollView>
  )
}



const style = StyleSheet.create({

  cards: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },

  Container: {
    width: windowWidth,
    marginLeft: 'auto',


  },
  view: {


  },
  name: {

  },

  container: {

  },
  image: {
    height: 200
  },

  button: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',



  }, text: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    width: 390,
    height: 60,


    color: 'black'
  },
  info: {
    color: 'black',
    padding: 20,
    fontSize: 25,


  },
  moreinfo: {
    fontWeight: '900',
    flexDirection: 'row',
    color: 'black',
    padding: 20,

  },


})


export default WorkSpaceDetails
