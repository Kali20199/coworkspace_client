import { makeAutoObservable, reaction, runInAction } from 'mobx'
import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';


export default class UserStore {

    AcceptDialog = false
    constructor() {
        makeAutoObservable(this)

    }


 

    setAcceptDialog = async (isVisable) => {
        runInAction( async() => { 
           this.AcceptDialog = isVisable
        }, [])

    }
}    