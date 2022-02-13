import { createContext, useContext } from "react";
import CoWorkStore from './CoWorkStore'
import UserStore from './User'
import  HubStore  from './HubStore';
import InfoStore from './InfoStore'

export const store=({
    CoWorkStore:new CoWorkStore(),
    UserStore:new UserStore(),
    Hub:new HubStore(),
    InfoStore:new InfoStore()
})


export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
} 