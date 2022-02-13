import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import { BASEURL } from "../agent/agent";
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
                .withUrl(`${BASEURL}:5003/chat?Reservations=SendMessage`)

                .build()
            await this.hubconnection.start()
            this.hubconnection.on("Reservations", (data) => {

            })
            this.hubconnection.on("AcceptReservation", (data) => {
                Alert.alert("AcceptConfirmed")
            })




            // const prox


        })


    }




    Invoke = async (method: string, value: any) => {

        runInAction(async () => {
          
            await this.hubconnection.invoke(method, value).then(res => {
                Alert.alert("Success")
            }).catch(e => {
            
            })
        })
    }


}