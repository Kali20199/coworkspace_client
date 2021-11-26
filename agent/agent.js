import axios from "axios";
import {Alert} from 'react-native'
import {PERSISTENCE_KEY} from '../store/User'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../store/store";

axios.defaults.baseURL='http://192.168.1.30:5003/api'
axios.interceptors.response.use(async(res)=>{

   

   return res
},(error)=>{
    const {data,status} = error.response
    const message = error.response.message
    Alert.alert("Failed",message.toString())
   
  
})


axios.interceptors.request.use(async(request)=>{
    //const UserStore =store.UserStore
    const token= await AsyncStorage.getItem(PERSISTENCE_KEY,(error)=>{})       

  //  Alert.alert("Access Token",token)
    request.headers.Authorization = `Bearer  ${token}` 
 
    return request

},(error)=>{
    Alert.alert("Error",error.data)
})


const Account = {
    Register:(Creds)=> {axios.post('/Account/register',Creds)},    
    GetToken:(Creds)=> axios.post('/Account/GetUser',Creds) ,
    SayHello:()=>axios.get('/Account/hello'),
    Login:(Cred)=>axios.post('/Account/login',Cred)
    
    

}

const WorkSpace = {
    FetchAllSpaceAround:()=>axios.get('/User/GetSpaceAound')
}


const agent ={
    Account,
    WorkSpace
}


export default agent