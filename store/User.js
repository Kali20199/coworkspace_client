import { makeAutoObservable, reaction, runInAction } from 'mobx'
import agent from '../agent/agent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import 'react-native-gesture-handler';


export const PERSISTENCE_KEY = 'UserToekn'
export const PROFILEPIC_KEY = 'PROFILEPIC_KEY'
export const UserInfo = "UserInfo"
const RERSERVATIONS = 'RERSERVATIONS'




export default class UserStore {
    Creds = {
        userName: 'Mostafa',
        email: null,
        password: null,
        city: null,
        phone: null,


    }
  
    Logged = false

    User = null
    email = null
    loading = false
    token = null
    ProfilePic = null
    Reservations = null
    UserLocation = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,


    }






    constructor() {
        makeAutoObservable(this)

    }

    GetUserEmail = async () => {

        runInAction(async () => {
            var user = await AsyncStorage.getItem(UserInfo, (error) => {

            }).catch(res => {
                this.User = res
            })
            if (user !== null) {
                this.email = user
            } else {
                //later On
            }
        })
    }

    Login = (Cred, props) => {

        runInAction(async () => {
            await agent.Account.Login(Cred).then(async (res) => {
                var userData = res.data
                if (res == undefined) {
                    Alert.alert("login Failed")
                } else {
                    var userData = res.data
                    // Persist UserEmail
                    await AsyncStorage.setItem(UserInfo, userData.email)
                    this.email = userData.email
                    this.Logged = true
                    this.token = res.data.token
                    await AsyncStorage.setItem(PERSISTENCE_KEY, this.token)
                    props.navigation.navigate('Dashboard')

                }
            }).catch(() => {
                Alert.alert("login Failed")
            })
        }, [])
    }

    FaceBookLogin = (profile, props) => {
        runInAction(async () => {
            await agent.Account.FBLogin(profile).then(async (res) => {
                this.token = res.data.token
                await AsyncStorage.setItem(PERSISTENCE_KEY, this.token)
                if (this.token != null && this.token != "" && this.token != undefined) {
                    props.navigation.navigate('Dashboard')
                }

            })
        }, [])
    }

    FaceBookLogout = async () => {
        runInAction = async () => {
            this.token = ""
            await AsyncStorage.setItem(PERSISTENCE_KEY, this.token)


        }
    }

    Register = async (Cred) => {

        runInAction(async () => {
            this.loading = true
            const password = Cred.password.toString()
            debugger
            //  await agent.Account.Register(Cred)
            this.loading = false

        })
    }




    GetPersitntToken = async = () => {

        runInAction(async () => {
            var token = await AsyncStorage.getItem(PERSISTENCE_KEY, (error) => {
            })
            this.token = token
        })
    }


    Logout = async (props) => {
        runInAction(async () => {
            this.token = ""

            await AsyncStorage.removeItem(PERSISTENCE_KEY)
            props.navigation.navigate("Login")
        })
    }

    CheckAuth = async () => {
        runInAction(async () => {
            await agent.Account.CheckAuth().catch((e) => {
                Alert.alert("Mobx Exception")
                return e
            })
        })
    }


    SayHello = async () => {
        await agent.Account.SayHello()
    }


    setLocation = (loc) => {

        runInAction(() => {
            this.UserLocation = loc
        })
    }
    ChangeImage = async (image) => {
        let formData = new FormData();
        var name = image.uri.split('/').pop()
        formData.append('file', {
            uri: Platform.OS == "android" ? image.uri : image.uri.replace('file://', ""),
            name: name,
            type: 'image/jpg'
        })

        await agent.Account.SetProfuilePic(formData)
        runInAction(async () => {
            this.ProfilePic = image

            await AsyncStorage.setItem(PROFILEPIC_KEY, JSON.stringify(this.ProfilePic)).catch((err) => {

                Alert.alert(err)
            })


        }, [])
    }

    GetImagPice = async () => {
        runInAction(async () => {

            this.ProfilePic = JSON.parse(await AsyncStorage.getItem(PROFILEPIC_KEY))
            const X = 3;

        }, [])

        return this.ProfilePic
    }


    AddReservation = async (reservation) => {
        try {
            runInAction(async () => {
                this.Reservations = reservation
           
                await AsyncStorage.setItem(RERSERVATIONS, JSON.stringify(this.Reservations))
            }, [])
        } catch (e) {

        }
    }


    setConfirmation = async(isConfirm)=>{
   try{
        runInAction(async()=>{
            this.Reservations.isConfirmed =isConfirm ?  "True" : "False"
            await AsyncStorage.setItem(RERSERVATIONS, JSON.stringify(this.Reservations))
        },[])
   }catch(e){}
     
    }

    GetReservation = async () => {
        try {
            runInAction(async () => {
                var Res = await AsyncStorage.getItem(RERSERVATIONS)
                this.Reservations = JSON.parse(Res)
            }, [])

        } catch (e) {

        }
    }

    DeleteReservation = async () => {
        try {
            runInAction(async () => {
                this.Reservations = null
                 await AsyncStorage.removeItem(RERSERVATIONS)
               
            }, [])

        } catch (e) {

        }
    }



}