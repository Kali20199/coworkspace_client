import { createContext, useContext } from "react";
import CoWorkStore from './CoWorkStore'
import UserStore from './User'


export const store=({
    CoWorkStore:new CoWorkStore(),
    UserStore:new UserStore()
})


export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
} 