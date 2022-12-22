
import { makeAutoObservable, runInAction } from 'mobx';

export default class PlacesStore {

    Place = {
        contrty: "Non",
        isActive: false,
        imageUrl: ''

    }


    Places = Array("")




    constructor() {
        makeAutoObservable(this)
    }


    getPlaces = async () => {

        runInAction = async() => { 


        }

    }
}