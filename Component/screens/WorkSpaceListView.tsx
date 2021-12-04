import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { Work } from '../../constant/Application';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import { store } from '../../store/store';
import Searchbar from '../Widgets/serchBar'
import Color from '../../constant/Color';







const LightSpaceListItem = (props) => {
    const { CoWorkStore } = store
    const { item } = props
    const { name, id, imageurl, tables } = item.item
    const x = 3;
    return (

        <View style={style.list}>

            <TouchableOpacity style={style.item_container} onPress={() => {
                CoWorkStore.setWorkSpaceOptions(name, id, imageurl, tables)
                props.nav.navigate('Ink')
            }}>
                <View style={{ width: '100%' }}>
                    <Image style={style.image} source={{ uri: imageurl }} />
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
                                CoWorkStore.setWorkSpaceOptions(name, id, imageurl, tables)
                                props.nav.navigate('Ink')
                            }} color={Color.Orange} title={'Reserve Now'} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}






function WorkSpaceListView(props) {


    const [value, setValue] = useState('')
    const [sortArr, setSortedArr] = useState([])


    useEffect(() => {
        setSortedArr(Work)
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
        <View>
            <View style={style.serbarView}>
                <Searchbar value={value} ChangeHandler={ChangeHandler} />
            </View>
            <FlatList style={{marginBottom:50}} numColumns={1} data={sortArr} keyExtractor={item => item.id} renderItem={item => <LightSpaceListItem item={item} nav={props.navigation} />} />
          
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
    
        color: 'white',
        fontSize: 21,
       

    },



})



export default observer(WorkSpaceListView)
