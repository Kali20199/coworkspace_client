import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Button, RefreshControl, Dimensions, Alert } from 'react-native';
import { Work } from '../../constant/Application';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import {  useStore } from '../../store/store';
import Searchbar from '../Widgets/serchBar'
import Color from '../../constant/Color';
import { List, ActivityIndicator, Colors, Switch } from 'react-native-paper';






const LightSpaceListItem = (props) => {
    const { item } = props
    const { name, id, mainImage, timeColosed } = item.item
    const { CoWorkStore:{getSpaceByid,setCoworkOptions} } = useStore()
    const NavigateDetail=async()=>{
        setCoworkOptions(name)
         await   getSpaceByid(id,props)
     
              
        
      
    }



   
    const x = 3;
    return (

        <View style={style.list}>

            <TouchableOpacity style={style.item_container} onPress={() => {
                     NavigateDetail()
    
            }}>
                <View style={{ width: '100%' }}>
                    <ImageBackground style={style.image} source={{ uri: mainImage }}>
                        <View style={style.ImgaeBack}>
                            <View style={style.Info}>
                                <Text style={style.Name}>
                                    {name}
                                </Text>
                                <View style={style.lowerSec}>
                                    <Text style={style.open}>
                                        Open
                                    </Text> 
                                    <Text style={style.City}>
                                        Alexandria
                                    </Text>
                                    <Button onPress={() => {
                                        // CoWorkStore.setWorkSpaceOptions(name, id, mainImage)
                                        // props.nav.navigate('Ink')
                                    }} color={Color.Orange} title={'Reserve Now'} />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

            </TouchableOpacity>
        </View>

    )
}






function WorkSpaceListView(props) {
    const windowHeight = Dimensions.get('window').height;

    const [value, setValue] = useState('')
    const [sortArr, setSortedArr] = useState([])
    const { CoWorkStore: { getAllSpacesCard, LightSpaceCard } } = useStore()
    const [refreshing, setRefreshing] = useState(false);
    const [Init, setInit] = useState(true);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(async()  => {
        setRefreshing(true);
       await getAllSpacesCard()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        setSortedArr(Work)
        setTimeout(()=>setInit(false),3000)
        if (LightSpaceCard.length <= 1) {
            getAllSpacesCard()
        }
    }, [])

    const ChangeHandler = (event) => {
        const { text } = event.nativeEvent

        setValue(text)

       
        value == "" ? setSortedArr(Work) : setSortedArr([])
        const arr = []
        Work.map((index) => {
            if (index.name.toUpperCase().includes(text.toUpperCase())) { arr.push(index) }
        })
        setSortedArr(arr)
        const x = 3;
    }




    return (
        <View  >
            {!(LightSpaceCard.length == 1) ?
                <ScrollView refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />} >
                    <View style={style.serbarView}>
                        <Searchbar value={value} ChangeHandler={ChangeHandler} />
                    </View>

                    <ActivityIndicator style={{position:'absolute', opacity: Init? 1: 0,top:(windowHeight/2)-60}}  animating={true} color={Colors.red800} />

                    <FlatList style={{ marginBottom: 50 }} numColumns={1} data={LightSpaceCard} keyExtractor={item => item.id} renderItem={item => <LightSpaceListItem item={item} navigation={props.navigation} />} />
                </ScrollView>

                : <View style={{ flexDirection: 'row', justifyContent: 'center', height: '100%' }} >
      
                       <ActivityIndicator style={{position:'absolute', opacity: Init? 1: 0,top:(windowHeight/2)-60}}  animating={true} color={Colors.red800} />
                       <View  style={{position:'absolute', opacity: !Init? 1: 0,top:(windowHeight/2)-60}}>
                       {Init==false ? 
                       <View>
                       <Text style={{color:'red',fontSize:20,fontWeight:'900'}}>Sorry No InterNet Connection!</Text>
                       <Text style={{color:'green',fontWeight:'900'}}>Swipe Screen to Refresh</Text>
                       </View>
                       : null}  
                       </View>
                    <ScrollView refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}/>
                 
                     
                  
                </View>}
        </View>
    )
}



const style = StyleSheet.create({

    serbarView: {
        flexDirection: 'row',
        justifyContent: 'center',

        width: '100%'

    },

    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',



    },



    item_container: {


        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        shadowColor: 'black',



    },
    ImgaeBack: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    image: {

        width: '100%',
        backgroundColor: 'black',
        height: 180,

    },
    name: {
        color: 'black',
        padding: 5,
        width: '100%',

    },
    Info: {


        position: 'absolute',
        zIndex: 2,
        left: 4,
        bottom: 9,
    },
    Name: {
        color: 'white',
        fontSize: 21,
        fontWeight: '900',
    },

    lowerSec: {
        width: '92%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    City: {
        color: 'white',
        fontSize: 21,

    },
    open: {

        color: '#08b03d',
        fontWeight: '900',
        fontSize: 21,


    },



})



export default observer(WorkSpaceListView)
