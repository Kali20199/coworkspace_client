import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import globalstyle from '../GlobalStyle'

import { useNavigation } from '@react-navigation/native';
import Toast, { ErrorToast } from 'react-native-toast-message'
import { Places } from '../../constant/DummyData'

import { useStore } from '../../store/store'









const CardWidget = ({nav,Places}) => {

    return <TouchableOpacity style={{marginBottom:20, marginTop:40}} onPress={() => {
        if(Places.isActive){
        nav.navigate("WorkSpaceList")
        }else{
            Toast.show({
                position: 'top',
                topOffset: 60,
                type: 'error',
                text1: 'Will be Online Soon'
                
            })
        }
    }}>
        <View style={{ ...style.cardView, ...globalstyle.cardView }}>

            <Image style={{ width: 100, height: 100 }} source={Places.imageUrl} />
            <View style={style.content}>
                <Text style={style.textcontry}>{Places.country}</Text>
                <Text style={{color: Places.isActive ?  "green" : "red",
                      ...style.status}}>  {Places.isActive ?  "Active" : "Not Active"}     </Text>
            </View>

        </View>
    </TouchableOpacity>

}





function PlacesScreen(props) {

    const {CoWorkStore:{getAllSpacesCard}} = useStore()

    const nav = useNavigation()
    return (
        <View style={{ padding: 20 }}>
            <FlatList data={Places} renderItem={(item)=><CardWidget nav={nav} Places={item.item} />} />
        </View>
    )
}



 

const style = StyleSheet.create({
    cardView: {
        flexDirection: 'row'
    },
    content: {
        padding: 15
    },

    textcontry: {
        color: 'black',
        fontSize: 19

    },
    status: {
      
        marginTop: 20,


    }


})

export default PlacesScreen