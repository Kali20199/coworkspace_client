import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert, View,Text } from "react-native";
import { BASEURL } from "../agent/agent";
import {store} from "./store";
import Dialogs from '../Component/Widgets/Dialogs'



export default class HubStore {


    hubconnection: HubConnection

    
    constructor() {
        makeAutoObservable(this);
    }


    StartHubConnection = async () => {
        const hub = new HubConnectionBuilder()
        const x = 3;
        runInAction(async () => {
            this.hubconnection = new HubConnectionBuilder()
                .withUrl(`${BASEURL}:5003/chat?Reservations=SendMessage`).withAutomaticReconnect()

                .build()
            await this.hubconnection.start().then((res) => {
                console.log("Nogiation Success")
    
            }).catch((err) => {
                console.error(err)
            });
            this.hubconnection.on("Reservations", (res) => {

                
            })
            this.hubconnection.on("AcceptReservation", (res) => {
               const Confirmation = res.isConfimed
                 store.UserStore.setConfirmation(Confirmation)
          
                
     
              store.InfoStore.setAcceptDialog(true)

              

           
               
              
            })




            // const prox


        })


    }




    Invoke = async (method: string, value: any) => {

        runInAction(async () => {
          
            await this.hubconnection.invoke(method, value).then(res => {
            
            }).catch(e => {
            
            })
        })
    }


}