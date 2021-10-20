import axios from "axios";
import {Alert} from 'react-native'
import {PERSISTENCE_KEY} from '../store/User'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../store/store";

axios.defaults.baseURL='http://192.168.1.30:5003/api/Account'
axios.interceptors.response.use(async(res)=>{

   

   return res
},(error)=>{
    const {data,status} = error.response
    const message = error.response.message
    Alert.alert("Access Token",message.toString())
   
  
})


axios.interceptors.request.use(async(request)=>{
    //const UserStore =store.UserStore
    const token= await AsyncStorage.getItem(PERSISTENCE_KEY,(error)=>{})       
    Alert.alert("Access Token",token)
    request.headers.Authorization = `Bearer  ${token}` 
    return request

})


const Account = {
    Register:(Creds)=> {axios.post('/register',Creds)},    
    GetToken:(Creds)=> axios.post('/GetUser',Creds) ,
    SayHello:()=>axios.get('/hello'),
    Login:(Cred)=>axios.post('/login',Cred)
    
    

}


const agent ={
    Account
}


export default agent