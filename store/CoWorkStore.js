import { makeAutoObservable, reaction, runInAction } from 'mobx'

import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';
import { GeoLocation } from '../Component/Models/Models'
import WorkSpaceCard from '../Component/Models/Models'

export default class CoWorkStore {

    name = 'WorkSpace'
    phone = null
    tables = 0
    city = 'Alexamdria'
    id = null
    imageurl = ''
    location = undefined
    workSpaces=  undefined
    LightSpaceCard = Array(WorkSpaceCard)


    constructor() {
        makeAutoObservable(this)

    }

    setCoworkOptions=(name)=>{
        runInAction(()=>{
            this.name = name
        })
    }




    getSpaceAround = async () => {

        runInAction(async () => {
            try {
                var X = await agent.WorkSpace.FetchAllSpaceAround().then(res => {
                    this.location = res.data
                    this.workSpaces = res.data
                })

                var Data = loc

            } catch (e) {
                var x = e

            }
        })}
  


        getAllSpacesCard = async()=>{
            runInAction(async()=>{
                try{
                var Spaces = await agent.WorkSpace.getSpacesList().then(res => {
                    this.LightSpaceCard = res.data
                    const spaces = res.data;
                
              
            })
        }catch(e){
            return e
        }
        })
    
    } 
  
    getSpaceByid=async(id,props)=>{
        runInAction(async()=>{
        
            var Spaces = await agent.WorkSpace.getSpaceByid(id).then(res => {
                this.workSpaces = res.data
        
                props.navigation.navigate('Ink') 
             
        }) 
 
    })
 
}

 
}
