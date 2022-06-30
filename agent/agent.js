import axios from "axios";
import { Alert } from 'react-native'
import { PERSISTENCE_KEY } from '../store/User'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../store/store";
import Toast, { ErrorToast } from 'react-native-toast-message'
// 'http://192.168.1.30:5003/api'
export const BASEURL = 'http://192.168.1.30'
axios.defaults.baseURL = `${BASEURL}:5003/api`

axios.interceptors.response.use(async (res) => {



    return res
}, (error) => {
    // const {data,status} = error.response
    // const message = error.response.message 
    // switch(error.response.status){
    //     case 401: 
    //         Alert.alert("You Need to Be Logged Please Re LoggedIn")

    //     default : return   

    // }
    switch (error.response.status) {
        case 401:
            Toast.show({
                position: 'top',
                topOffset: 60,
                type: 'error',
                text1: 'UnAuthorized'
            })
            break;
        default:
            Toast.show({
                position: 'top',
                topOffset: 60,
                type: 'error',
                text1: 'Server Error'
            })
            break;

    }


    return error
})


axios.interceptors.request.use(async (request) => {
    //const UserStore =store.UserStore
    const token = await AsyncStorage.getItem(PERSISTENCE_KEY, (error) => { })

    //  Alert.alert("Access Token",token)
    request.headers.Authorization = `Bearer  ${token}`

    return request

}, (error) => {



})


const Account = {
    Register: (Creds) => { axios.post('/Account/register', Creds) },
    GetToken: (Creds) => axios.post('/Account/GetUser', Creds),
    SayHello: () => axios.get('/Account/hello'),
    Login: (Cred) => axios.post('/Account/login', Cred),
    UploadProfilePic: (image) => axios.post('/Account/UploadImage', image),
    CheckAuth: () => axios.get('Account/CheckAuth'),
    SetProfuilePic: (image) => axios.post('Account/SetProfPic', image),
    FBLogin: (profile) => axios.post('Account/FbLogin', profile)



}

const WorkSpace = {
    FetchAllSpaceAround: () => axios.get('/User/GetSpaceAound'),
    getSpacesList: () => axios.get('User/getSpacesList'),
    getSpaceByid: (id) => axios.post('User/GetSpaceById', { id })
}


const agent = {
    Account,
    WorkSpace
}


export default agent