import { makeAutoObservable, reaction, runInAction } from 'mobx'

import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';



export default class CoWorkStore{

    name='Ink'
    phone=null
    tables=0
    city='Alexamdria'
    id=null
    imageurl=''


    constructor()
    {
        makeAutoObservable(this)
       
    }  



    setWorkSpaceOptions=(name,id,imageurl,tables)=>{
        runInAction(()=>{
            this.name = name
            this.id = id,
            this.imageurl = imageurl,
            this.tables = tables
        })
    }
         
    
}