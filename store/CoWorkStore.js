import { makeAutoObservable, reaction, runInAction } from 'mobx'

export default class CoWorkStore{
 Cowork=[]
    constructor()
    {
        makeAutoObservable(this)
       
    }          
            
    
}