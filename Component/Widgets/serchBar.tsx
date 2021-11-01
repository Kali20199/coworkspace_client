import React, { useState } from 'react'
import { View,StyleSheet } from 'react-native'
import {Searchbar } from 'react-native-paper'


function serchBar(props) {






    return (
        <Searchbar nativeID='Search' style={style.serchbar} icon=''  value={props.value} onChange={props.ChangeHandler} placeholder='Search here' >
            
        </Searchbar >
    )
}




const style= StyleSheet.create({

    serchbar:{
   
        width:'80%',
        borderRadius:10
    }
})


export default serchBar


