import { makeAutoObservable, reaction, runInAction } from 'mobx'
import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';





export default class WorkSpaceStore{

    name=null
    phone=null
    tables=null
    city=null


    constructor()
    {
        makeAutoObservable(this)
       
    }  



    setWorkSpaceOptions=(name)=>{
        runInAction(()=>{
            this.name = name
        })
    }

    
    







}