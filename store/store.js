import { createContext, useContext } from "react";
import CoWorkStore from './CoWorkStore'
import UserStore from './User'
import  HubStore  from './HubStore';


export const store=({
    CoWorkStore:new CoWorkStore(),
    UserStore:new UserStore(),
    Hub:new HubStore()
})


export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
} 