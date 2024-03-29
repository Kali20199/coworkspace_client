import { View, Text, StyleSheet, Image, Button, Alert, Animated, Easing, Dimensions, RefreshControl } from 'react-native'
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
import DateTimePicker from '@react-native-community/datetimepicker';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import TIMEADD from '../../assets/time.png'
import DATE from '../../assets/date.png'
import SwipeModal from '../Modals/SwipeModal'
import Entypo from 'react-native-vector-icons/Entypo'
import * as signalR from '@microsoft/signalr';
import MyButton from './../MyCustomCompnents/MyButton';
import { SharedElement } from 'react-navigation-shared-element'
import { useNavigation } from '@react-navigation/native'










const windowWidth = Dimensions.get('window').width;
function WorkSpaceDetails(props) {
  const [visible, setVisible] = React.useState(false);
  const [showInfo, setInfo] = useState(true)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const scalingInit = new Animated.Value(0)
  const scaling = scalingInit.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4]
  })

  const { UserStore, Hub } = useStore()
  const { CoWorkStore } = useStore()

  const [swipeModal, setSwipeModal] = useState(false);





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





  }, [])




  const RenderInfo = () => {
    return (

      <ScrollView>
        <Text style={[style.moreinfo]}>
          <MaterialCommunityIcons name={'phone'} size={20} color='green' />
          .     phone : {CoWorkStore?.workSpaces.phone}
        </Text>

        <Text style={[style.moreinfo]}>
          <MaterialCommunityIcons name={'users'} size={20} color='blue' />
          .     Owner : {CoWorkStore.workSpaces.name}
        </Text>
        <Text style={[style.moreinfo]}>
          <MaterialCommunityIcons name={'clock'} size={20} color='green' />
          .     Time Open : {CoWorkStore.workSpaces.timeOpen}
        </Text>
        <Text style={[style.moreinfo]}>
          <FontAwesome5 name={"window-close"} size={20} color='red' />
          .    Time Close : {CoWorkStore.workSpaces.timeClosed}
        </Text>


        <Text style={[style.moreinfo]}>
          <FontAwesome5 name={"table"} size={20} color='brown' />
          .     Tables :  {CoWorkStore.workSpaces.tables}
        </Text>

        <Text style={[style.moreinfo]}>
          <FontAwesome5 name={"person-booth"} size={20} color='green' />
          .     Private Rooms :  {CoWorkStore.workSpaces.privateRooms}
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

      </ScrollView>
    )
  }



  const pan = React.useRef(new Animated.ValueXY()).current;
  const { workSpaces } = CoWorkStore

  const getMainImage = (workSpaces) => {
    const MainImg = workSpaces.images.find(x => x.isMain == true).url;
    return MainImg
  }

  const MainImg = getMainImage(workSpaces)



  return (
    <ScrollView >

      <Provider>

        <View>
          <View>
            <SharedElement id={MainImg}>
              <Image resizeMode='cover' style={style.image} source={{ uri: MainImg }} />
              {/* <Text>fdsfsdfsdf</Text> */}
            </SharedElement>
          </View>
          {showInfo &&
            <View style={{ flexDirection: 'row', justifyContent: 'center', ...style.Container }}>
              <View>
                <Text style={[style.text, style.name, style.cards]}>
                  {workSpaces.name}
                </Text>


                <Animated.Text style={[style.text, style.cards]}>
                  Free Tables : {workSpaces.tables}
                </Animated.Text>


                <Animated.Text style={[style.text, style.cards]}>
                  city : {workSpaces.city}
                </Animated.Text>

                <Text style={[style.info]}>
                  Space Info
                </Text>

                <RenderInfo />




                <Card>
                  <Card.Title>Space View</Card.Title>
                  <FlatList horizontal data={workSpaces.images} renderItem={item =>

                    <WorkSpaceImage img={item.item.url} />} />

                </Card>

              </View>
            </View>}
          {/* {ReservarionModal()} */}

          <SwipeModal swipeModal={swipeModal} setSwipeModal={setSwipeModal} HubCon={Hub} />

          <View style={style.button}>


            <View style={{ width: 250 }}>
              <MyButton icon={<Entypo name={'book'} size={22} color='white' />} title={'Reserve Now'} color={Color.primary} fun={() => {
                setSwipeModal(!swipeModal)
                showModal()
              }} />
            </View>
            {/* // PushNotification.localNotification({
              //   channelId: "test-channel",
              //   title: "Light Space",
              //   message: 'Reserved Succssefully',


              // }) */}

          </View>
        </View>

      </Provider>
      {/* <WebView style={{width:400,height:800}} source={{ uri: 'http://192.168.1.30:3001/Dashboard' }} /> */}
    </ScrollView>
  )
}



const style =  StyleSheet.create({

  cards: {
    shadowColor: 'black',
    flexDirection:'row',
    justifyContent:'center',
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
    height: 250
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
WorkSpaceDetails.sharedElements = ({ route }) => {
  var imgid = route.params
  //const item = useNavigation.getParam("id");

  return [imgid]
}



export default WorkSpaceDetails
