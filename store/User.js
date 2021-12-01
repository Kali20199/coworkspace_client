import { makeAutoObservable, reaction, runInAction } from 'mobx'
import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';


export const PERSISTENCE_KEY = 'UserToekn'

export default class UserStore{
Creds = {  
userName:'Mostafa', 
email:null,
password:null,
city:null,
phone:null,

 }
loading=false 
token=null
UserLocation={
    latitude: 0,
    longitude:0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  
    
}



   


    constructor()
    {
        makeAutoObservable(this)
       
    }  
    
    Login=(Cred)=>{

      agent.Account.Login(Cred).then(()=>{ this.GetuserToken(Cred.email,Cred.password)})
      agent.Account.SayHello()
     
     
    }

    Register=async(Cred)=>{

        runInAction(async()=>{
          this.loading=true      
          const  password = Cred.password.toString()
          debugger
        //  await agent.Account.Register(Cred)
          this.loading=false
       
          this.GetuserToken(Cred.email,password)
      
        })
    }


    GetuserToken=async(email,pass)=>
    {
        runInAction(async()=>{
            Cred={
                email:email,
                password:pass
            }
            var Token =  await agent.Account.GetToken(Cred)
           
            this.token = Token.data.token    
            await AsyncStorage.setItem(PERSISTENCE_KEY,this.token)
        var token= await AsyncStorage.getItem(PERSISTENCE_KEY,(error)=>{})       
        this.loading = true   
        this.loading=false 
        if(!token)  {      
         
           
            
        }
        
     //   this.token = JSON.parse(token)
        this.token = Token.data.token
        return this.token
       
    })
    }


    SayHello=async()=>{
        await agent.Account.SayHello()
    }


    setLocation=(loc)=>{

        runInAction(()=>{
            this.UserLocation = loc
        })
    }

    
            
    
}